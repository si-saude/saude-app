import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global';
import { Ghee } from './../../../model/ghee';
import { GheeService } from './../ghee.service';
import { GheeFilter } from './../ghee.filter';
import { GheeBuilder } from './../ghee.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-ghee-form-detail',
    templateUrl: './ghee-form-detail.html',
    styleUrls: ['./ghee-form.css', './../../../../assets/css/form-component.css']
} )
export class GheeFormDetailComponent extends GenericFormComponent implements OnInit {
    ghee: Ghee;
    
    //ngModel
    dataCriacao: any;
    dataDesativacao: any;
    
    gheeFilter: GheeFilter = new GheeFilter();

    constructor( private route: ActivatedRoute,
        private gheeService: GheeService,
        router: Router) { 
        super(gheeService, router);
        this.goTo = "ghee";

        this.ghee = new GheeBuilder().initialize(this.ghee);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.gheeService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.ghee = new GheeBuilder().clone(res.json());
                        this.parseAndSetDates();
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }
        
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    parseAndSetDates() {
        if (this.ghee.getDataCriacao() !== null && 
                this.ghee.getDataCriacao() !== undefined) {
            this.dataCriacao = this.dateUtil.parseDataToObjectDatePicker(this.ghee.getDataCriacao());
        }
        if (this.ghee.getDataDesativacao() !== null && 
                this.ghee.getDataDesativacao() !== undefined) {
            this.dataDesativacao = this.dateUtil.parseDataToObjectDatePicker(this.ghee.getDataDesativacao());
        }
        
    }
}
