import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Equipe } from './../../../model/equipe';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeService } from './../../profissional-saude/profissional-saude.service';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { EquipeBuilder } from './../equipe.builder';
import { EquipeService } from './../equipe.service';
import { ProfissionalNomeAutocomplete } from './../../profissional-saude/profissional-nome.autocomplete';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-equipe-form',
    templateUrl: './equipe-form.html',
    styleUrls: ['./equipe-form.css', './../../../../assets/css/form-component.css']
} )
export class EquipeFormComponent extends GenericFormComponent implements OnInit { 
    equipe: Equipe;
    profissionalNomeAutocomplete: ProfissionalNomeAutocomplete;

    constructor( private route: ActivatedRoute,
            private equipeService: EquipeService,
            private profissionalSaudeService: ProfissionalSaudeService,
            router: Router) { 
            super(equipeService, router);
            
            this.goTo = "equipe";
            this.equipe = new EquipeBuilder().initialize(this.equipe);
            this.equipe.getCoordenador().setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
            this.profissionalNomeAutocomplete = new ProfissionalNomeAutocomplete(this.profissionalSaudeService);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.equipeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.equipe = new EquipeBuilder().clone(res.json());
                            this.profissionalNomeAutocomplete.getAutocomplete().initializeLastValue(
                                    this.equipe.getCoordenador().getEmpregado().getPessoa().getNome())
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new EquipeBuilder().clone(this.equipe));
    }
    
}