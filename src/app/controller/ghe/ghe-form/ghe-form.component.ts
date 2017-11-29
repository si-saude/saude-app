import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global';
import { Ghe } from './../../../model/ghe';
import { GheService } from './../ghe.service';
import { GheFilter } from './../ghe.filter';
import { GheBuilder } from './../ghe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-ghe-form',
    templateUrl: './ghe-form.html',
    styleUrls: ['./ghe-form.css', './../../../../assets/css/form-component.css']
} )
export class GheFormComponent extends GenericFormComponent implements OnInit {
    ghe: Ghe;
    
    //ngModel
    dataCriacao: any;
    dataDesativacao: any;
    
    gheFilter: GheFilter = new GheFilter();
    
    constructor( private route: ActivatedRoute,
        private gheService: GheService) { 
        super(gheService);
        this.goTo = "ghe";

        this.ghe = new GheBuilder().initialize(this.ghe);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    
                    this.gheService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.ghe = new GheBuilder().clone(res.json());
                            this.parseAndSetDates();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    save() {
        this.verifyAndSetDates();
        super.save(new GheBuilder().clone(this.ghe));
    }   
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetDates() {
        if (this.dataCriacao !== null && 
                this.dataCriacao  !== undefined)
            this.ghe.setDataCriacao(
                    this.parseDatePickerToDate(this.dataCriacao));

        if (this.dataDesativacao !== null && 
                this.dataDesativacao !== undefined)
            this.ghe.setDataDesativacao(
                    this.parseDatePickerToDate(this.dataDesativacao));
    }
    
    parseAndSetDates() {
        if (this.ghe.getDataCriacao() !== null && 
                this.ghe.getDataCriacao() !== undefined) {
            this.dataCriacao = this.parseDataToObjectDatePicker(this.ghe.getDataCriacao());
        }
        if (this.ghe.getDataDesativacao() !== null && 
                this.ghe.getDataDesativacao() !== undefined) {
            this.dataDesativacao = this.parseDataToObjectDatePicker(this.ghe.getDataDesativacao());
        }
        
    }
}
