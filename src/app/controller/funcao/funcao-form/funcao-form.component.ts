import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Funcao } from './../../../model/funcao';
import { Vacina } from './../../../model/vacina';
import { VacinaBuilder } from './../../vacina/vacina.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FuncaoBuilder } from './../funcao.builder';
import { FuncaoService } from './../funcao.service';

@Component( {
    selector: 'app-funcao-form',
    templateUrl: './funcao-form.html',
    styleUrls: ['./funcao-form.css', './../../../../assets/css/form-component.css']
} )
export class FuncaoFormComponent extends GenericFormComponent implements OnInit { 
    funcao: Funcao;
    vacinas: Array<Vacina>;
    vacinasSelecteds: Array<Vacina>;
    
    constructor( private route: ActivatedRoute,
            private funcaoService: FuncaoService) { 
            super(funcaoService);
            this.goTo = "funcao";
            
            this.funcao = new FuncaoBuilder().initialize(this.funcao);
        }
    
    ngOnInit() {
        this.vacinasSelecteds = new Array<Vacina>();
        
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
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.funcaoService.getVacinas()
            .then(res => {
                this.vacinas = new VacinaBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
        
    }
    
    save() {
        super.save(new FuncaoBuilder().clone(this.funcao));
    }   
    
    addVacina(valor: number) {
        if ( valor != 0 ) {
            let v = this.vacinasSelecteds.find(v => v.getId() == valor);
            
            if ( v == null ) {
                let vacina:Vacina = this.vacinas.find(v => v.getId() == valor);
                this.vacinasSelecteds.push(vacina);
                this.funcao.setVacinas(this.vacinasSelecteds);
            }
        }
    }

    removeVacina(i: number) {
        this.funcao.getVacinas().splice(i, 1);
    }
    
}