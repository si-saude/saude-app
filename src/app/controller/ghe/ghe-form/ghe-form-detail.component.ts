import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global';
import { Ghe } from './../../../model/ghe';
import { GheService } from './../ghe.service';
import { GheFilter } from './../ghe.filter';
import { GheBuilder } from './../ghe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-ghe-form-detail',
    templateUrl: './ghe-form-detail.html',
    styleUrls: ['./ghe-form.css', './../../../../assets/css/form-component.css']
} )
export class GheFormDetailComponent extends GenericFormComponent implements OnInit {
    ghe: Ghe;
    
    //ngModel
    dataCriacao: any;
    dataDesativacao: any;
    
    gheFilter: GheFilter = new GheFilter();
    
    constructor( private route: ActivatedRoute,
        private gheService: GheService,
        router: Router) { 
        super(gheService, router);
        this.goTo = "ghe";

        this.ghe = new GheBuilder().initialize(this.ghe);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
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
            } );
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
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
