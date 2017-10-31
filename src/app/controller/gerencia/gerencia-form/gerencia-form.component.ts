import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Gerencia } from './../../../model/gerencia';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaBuilder } from './../gerencia.builder';
import { GerenciaService } from './../gerencia.service';
import { EmpregadoService } from './../../empregado/empregado.service';

@Component( {
    selector: 'app-gerencia-form',
    templateUrl: './gerencia-form.html',
    styleUrls: ['./gerencia-form.css']
} )
export class GerenciaFormComponent extends GenericFormComponent<Gerencia> implements OnInit { 
    gerencia: Gerencia;
    gerencias: Array<Gerencia>;
    empregados: Array<any>;
    autocompleteEmpregado = [];
    
    constructor( private route: ActivatedRoute,
            private gerenciaService: GerenciaService,
            private empregadoService: EmpregadoService) { 
            super(gerenciaService);
            this.goTo = "gerencia";
//            this.autocompleteEmpregado = new Array<string>();
            this.empregados = new Array<any>();
            this.gerencias = new Array<Gerencia>();
            this.gerencia = new GerenciaBuilder().initialize(this.gerencia);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.gerenciaService.get( id )
                        .then( res => {
                            this.showPreload = false;
        
                            this.gerencia = new GerenciaBuilder().clone(res.json());
                            
                            this.gerenciaService.getGerenciasWithFilterId(this.gerencia.getId())
                                .then(res => {
                                    this.gerencias = res.json();
                                })
                                .catch(error => {
                                    console.log(error);
                                })
        
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                } else {
                    this.gerenciaService.getGerenciasWithFilterId(this.gerencia.getId())
                        .then(res => {
                            this.gerencias = res.json();
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            } );
        
    }
    
    save() {
        super.save(new GerenciaBuilder().clone(this.gerencia));
    }
    
    getGerente() {
        this.gerencia.setGerente(this.getAutocompleteValue(this.gerencia.getGerente().getNome()));
    }
    
    getSecretario1() {
        this.gerencia.setSecretario1(this.getAutocompleteValue(this.gerencia.getSecretario1().getNome()));
    }
    
    getSecretario2() {
        this.gerencia.setSecretario2(this.getAutocompleteValue(this.gerencia.getSecretario2().getNome()));
    }
    
    getAutocompleteValue(valor: string) {
        if (valor !== undefined) {
            let empregado = this.empregados.find(e => e.getNome() === valor); 
            if ( empregado !== undefined ) {
                return empregado;
            } else return new EmpregadoBuilder().initialize(new Empregado());
        } else return new EmpregadoBuilder().initialize(new Empregado());
    }
    
    selectEmpregado(evento) {
        if( evento.length > 3 ) {
            
            this.empregadoService.getEmpregadoByName(evento)
                .then(res => {
                    this.empregados = new EmpregadoBuilder().cloneList(res.json());
                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado()];
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    
    buildAutocompleteEmpregado() {
        let data = {} ;
        this.empregados.forEach(item => {
            data[item.getNome()] = null;
        });
        
        let array = {};
        array["data"] = data;
        
        return array;
    }
    
    
}