import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Funcao } from './../../../model/funcao';
import { Vacina } from './../../../model/vacina';
import { VacinaBuilder } from './../../vacina/vacina.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FuncaoBuilder } from './../funcao.builder';
import { FuncaoService } from './../funcao.service';

@Component( {
    selector: 'app-funcao-form-detail',
    templateUrl: './funcao-form-detail.html',
    styleUrls: ['./funcao-form.css', './../../../../assets/css/form-component.css']
} )
export class FuncaoFormDetailComponent extends GenericFormComponent implements OnInit { 
    funcao: Funcao;
    vacinas: Array<Vacina>;
    vacinasSelecteds: Array<Vacina>;
    
    constructor( private route: ActivatedRoute,
            private funcaoService: FuncaoService,
            router: Router) { 
            super(funcaoService, router);
            this.goTo = "funcao";
            
            this.funcao = new FuncaoBuilder().initialize(this.funcao);
        }
    
    ngOnInit() {
        this.vacinasSelecteds = new Array<Vacina>();
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
                let id = params['id'];
                this.showPreload = true;

                this.funcaoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.funcao = new FuncaoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
        this.funcaoService.getVacinas()
            .then(res => {
                this.vacinas = new VacinaBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
        
    }
    
}