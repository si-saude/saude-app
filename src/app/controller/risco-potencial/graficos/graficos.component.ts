import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { RiscoEmpregado } from './../../../model/risco-empregado';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialService } from './../risco-potencial.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-graficos',
    templateUrl: './graficos.html',
    styleUrls: ['./graficos.css']
} )
export class GraficosComponent extends GenericFormComponent {
    private riscoPotencial: RiscoPotencial;
    @ViewChild("baseChart") chart: BaseChartDirective;
    
    private barChartOptions: any;
    private barChartLabels: Array<string>;
    private barChartType: string;
    private barChartLegend: boolean;
    private barChartData: Array<any>;
    private barChartColors: Array<any>;
    private lineChartData:Array<any>;
    private lineChartOptions:any;
    private lineChartColors:Array<any>;
    private lineChartType:string;

    constructor( private route: ActivatedRoute,
        private riscoPotencialService: RiscoPotencialService,
        router: Router ) {
        super( riscoPotencialService, router );

        this.goTo = "risco-potencial";

        this.riscoPotencial = new RiscoPotencialBuilder().initialize( new RiscoPotencial() );
        this.barChartOptions = {
                scaleShowVerticalLines: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 9,
                            position: 'top'
                        }
                    }]
                },
                responsive: true
            };
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartLabels = new Array<string>();
        this.barChartData = [ {data: [] } ];
        this.barChartColors = new Array<any>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.riscoPotencialService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                            
                            let lineColor:string;
                            
                            if ( this.riscoPotencial.getStatusRPSat().includes("INACEIT") )
                                lineColor = "#ff1100";
                            else if ( this.riscoPotencial.getStatusRPSat().includes("TOLER") )
                                lineColor = "#ffcc00";
                            else lineColor = "#00ff11";
                            
                            let arrayColor = [];
                            let arrayData = [];
                            let arrayLineData = [];
                            for ( let i = 0; i < this.riscoPotencial.getRiscoEmpregados().length; i++ ) {
                                arrayData.push(this.riscoPotencial.getRiscoEmpregados()[i].getValorPonderado());
                                arrayLineData.push(this.riscoPotencial.getValor());
                                this.barChartLabels.push(this.riscoPotencial.getRiscoEmpregados()[i].getEquipe().getNome());
                                
                                if ( this.riscoPotencial.getRiscoEmpregados()[i].getStatusRPSat().includes("INACEIT") )
                                    arrayColor.push("#ff0000");
                                else if ( this.riscoPotencial.getRiscoEmpregados()[i].getStatusRPSat().includes("TOLER") )
                                    arrayColor.push("#ffaa00");
                                else arrayColor.push("#00ff00");
                            }
                            let jsonColor = { backgroundColor: arrayColor };
                            let jsonLineData = { 
                                    data: arrayLineData, 
                                    backgroundColor: [lineColor], 
                                    fill: false,
                                    borderWidth: 10,
                                    type: "line"};
                            let jsonData = { data: arrayData, legend: { fontSize: 9} };
                            
                            this.barChartColors.push(jsonColor);
                            this.barChartColors.splice(0, 0, jsonLineData)
                            this.barChartData.push(jsonData);
                            
                            this.chart.chart.destroy();
                            this.chart.chart = 0;
                            this.chart.datasets = this.barChartData;
                            this.chart.ngOnInit();
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }

}