import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Funcao } from './../../../model/funcao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FuncaoBuilder } from './../funcao.builder';
import { FuncaoService } from './../funcao.service';

@Component( {
    selector: 'app-funcao-form',
    templateUrl: './funcao-form.html',
    styleUrls: ['./funcao-form.css']
} )
export class FuncaoFormComponent extends GenericFormComponent<Funcao> implements OnInit { 
    funcao: Funcao;
    
    constructor( private route: ActivatedRoute,
            private funcaoService: FuncaoService) { 
            super(funcaoService);
            this.goTo = "funcao";
            
            this.funcao = new FuncaoBuilder().initialize(this.funcao);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.funcaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.funcao = new FuncaoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new FuncaoBuilder().clone(this.funcao));
    }   
    
    
}