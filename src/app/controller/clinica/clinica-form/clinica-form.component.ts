import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Clinica } from './../../../model/clinica';
import { Exame } from './../../../model/exame';
import { GrupoMonitoramentoProfissiogramaExame } from './../../../model/grupo-monitoramento-profissiograma-exame';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ClinicaBuilder } from './../clinica.builder';
import { GrupoMonitoramentoProfissiogramaExameBuilder } from './../../grupo-monitoramento-profissiograma-exame/grupo-monitoramento-profissiograma-exame.builder';
import { ClinicaService } from './../clinica.service';
import { ExameDescricaoAutocomplete } from './../../exame/exame-descricao.autocomplete';

@Component( {
    selector: 'app-clinica-form',
    templateUrl: './clinica-form.html',
    styleUrls: ['./clinica-form.css', './../../../../assets/css/form-component.css']
} )
export class ClinicaFormComponent extends GenericFormComponent implements OnInit {
    private clinica: Clinica;
    private exame:GrupoMonitoramentoProfissiogramaExame;
    private autoCompleteExame: ExameDescricaoAutocomplete;

    constructor( private route: ActivatedRoute,
        private clinicaService: ClinicaService,
        router: Router) {
        super( clinicaService, router );

        this.goTo = "clinica";
        this.clinica = new ClinicaBuilder().initialize( this.clinica );
        this.exame = new GrupoMonitoramentoProfissiogramaExameBuilder().initialize(this.exame);
        
        this.autoCompleteExame = new ExameDescricaoAutocomplete(this.clinicaService.getExameService());
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.clinica = new ClinicaBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    addExame() {
        if(this.exame && this.exame.getExame() && this.exame.getExame().getId() > 0){
            if(!this.clinica.getExames().find(e => e.getId() == this.exame.getExame().getId())){
                this.clinica.getExames().push(this.exame.getExame());
                this.exame = new GrupoMonitoramentoProfissiogramaExameBuilder().initialize(this.exame);
            }            
        }
    }
    
    removeExame(i: number) {
        this.clinica.getExames().splice(i, 1);
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new ClinicaBuilder().clone( this.clinica ) );
    }
}