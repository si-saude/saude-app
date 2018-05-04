import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Eixo } from './../../../model/eixo';
import { EixoBuilder } from './../../eixo/eixo.builder';
import { DiagnosticoService } from './../diagnostico.service';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../diagnostico.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-diagnostico-form',
    templateUrl: './diagnostico-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './diagnostico-form.css']
} )
export class DiagnosticoFormComponent extends GenericFormComponent implements OnInit { 
    diagnostico: Diagnostico;
    eixos: Array<Eixo>;
    
    constructor( private route: ActivatedRoute,
            private diagnosticoService: DiagnosticoService,
            router: Router) { 
            super(diagnosticoService, router);
            
            this.goTo = "diagnostico";
            this.diagnostico = new DiagnosticoBuilder().initialize(this.diagnostico);
        }
    
    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.diagnosticoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.diagnostico = new DiagnosticoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEixos();
    }
    
    save() {
        super.save(new DiagnosticoBuilder().clone(this.diagnostico));
    }
    
    getEixos(){
        this.diagnosticoService.getEixos()
        .then(res => {
            this.eixos = new EixoBuilder().cloneList(res.json());
        })
        .catch(error => {
            console.log(error);
        });
    }
    
}