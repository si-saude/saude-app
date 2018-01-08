import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { ResultadoExame } from './../../../model/resultado-exame';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ResultadoExameBuilder } from './../resultado-exame.builder';
import { ResultadoExameService } from './../resultado-exame.service';

@Component( {
    selector: 'app-resultado-exame-form-detail',
    templateUrl: './resultado-exame-form-detail.html',     
    styleUrls: ['./resultado-exame-form.css', './../../../../assets/css/form-component.css']
} )
export class ResultadoExameFormDetailComponent extends GenericFormComponent implements OnInit { 
    resultadoExame: ResultadoExame;
    
    constructor( private route: ActivatedRoute,
            private resultadoExameService: ResultadoExameService) { 
            super(resultadoExameService);
            this.goTo = "resultado-exame";
            
            this.resultadoExame = new ResultadoExameBuilder().initialize(this.resultadoExame);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.resultadoExameService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.resultadoExame = new ResultadoExameBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
    }
    
}