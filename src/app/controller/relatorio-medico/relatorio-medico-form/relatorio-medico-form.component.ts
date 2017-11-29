import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { RelatorioMedico } from './../../../model/relatorio-medico';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RelatorioMedicoBuilder } from './../relatorio-medico.builder';
import { RelatorioMedicoService } from './../relatorio-medico.service';

@Component( {
    selector: 'app-relatorio-medico-form',
    templateUrl: './relatorio-medico-form.html',
    styleUrls: ['./relatorio-medico-form.css', './../../../../assets/css/form-component.css']
} )
export class RelatorioMedicoFormComponent extends GenericFormComponent implements OnInit { 
    relatorioMedico: RelatorioMedico;
    
    constructor( private route: ActivatedRoute,
            private relatorioMedicoService: RelatorioMedicoService) { 
            super(relatorioMedicoService);
            this.goTo = "relatorio-medico";
            
            this.relatorioMedico = new RelatorioMedicoBuilder().initialize(this.relatorioMedico);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.relatorioMedicoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.relatorioMedico = new RelatorioMedicoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new RelatorioMedicoBuilder().clone(this.relatorioMedico));
    }   
    
}