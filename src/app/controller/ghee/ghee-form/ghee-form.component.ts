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
    selector: 'app-ghee-form',
    templateUrl: './ghee-form.html',
    styleUrls: ['./ghee-form.css', './../../../../assets/css/form-component.css']
} )
export class GheeFormComponent extends GenericFormComponent implements OnInit {
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
                if( params['id'] !== undefined ) {
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
                }
            } );
    }
    
    save() {
        this.verifyAndSetDates();
        
        super.save(new GheeBuilder().clone(this.ghee));
    }   
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetDates() {
        if (this.dataCriacao !== null && 
                this.dataCriacao  !== undefined)
            this.ghee.setDataCriacao(
                    this.parseDatePickerToDate(this.dataCriacao));

        if (this.dataDesativacao !== null && 
                this.dataDesativacao !== undefined)
            this.ghee.setDataDesativacao(
                    this.parseDatePickerToDate(this.dataDesativacao));
    }
    
    parseAndSetDates() {
        if (this.ghee.getDataCriacao() !== null && 
                this.ghee.getDataCriacao() !== undefined) {
            this.dataCriacao = this.parseDataToObjectDatePicker(this.ghee.getDataCriacao());
        }
        if (this.ghee.getDataDesativacao() !== null && 
                this.ghee.getDataDesativacao() !== undefined) {
            this.dataDesativacao = this.parseDataToObjectDatePicker(this.ghee.getDataDesativacao());
        }
        
    }
}
