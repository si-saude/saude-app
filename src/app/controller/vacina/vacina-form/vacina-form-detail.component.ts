import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Vacina } from './../../../model/vacina';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { VacinaBuilder } from './../vacina.builder';
import { VacinaService } from './../vacina.service';

@Component( {
    selector: 'app-vacina-form-detail',
    templateUrl: './vacina-form-detail.html',
    styleUrls: ['./vacina-form.css', './../../../../assets/css/form-component.css']
} )
export class VacinaFormDetailComponent extends GenericFormComponent implements OnInit { 
    vacina: Vacina;
    
    constructor( private route: ActivatedRoute,
            private vacinaService: VacinaService) { 
            super(vacinaService);
            this.goTo = "vacina";
            
            this.vacina = new VacinaBuilder().initialize(this.vacina);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.vacinaService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.vacina = new VacinaBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
    }
   
}