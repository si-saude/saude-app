import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";


import { GlobalVariable } from './../../../global';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeService } from './../profissional-saude.service';
import { ProfissionalSaudeFilter } from './../profissional-saude.filter';
import { Localizacao } from './../../../model/localizacao';
import { Empregado } from './../../../model/empregado';
import { Equipe } from './../../../model/equipe';
import { Cargo } from './../../../model/cargo';
import { Curso } from './../../../model/curso';
import { CurriculoCurso } from './../../../model/curriculo-curso';
import { Cidade } from './../../../model/cidade';
import { Curriculo } from './../../../model/curriculo';
import { Endereco } from './../../../model/endereco';
import { Telefone } from './../../../model/telefone';
import { Vacina } from './../../../model/vacina';
import { ProfissionalConselho } from './../../../model/profissional-conselho';
import { ProfissionalVacina } from './../../../model/profissional-vacina';
import { ProfissionalVacinaBuilder } from './../../profissional-vacina/profissional-vacina.builder';
import { Servico } from './../../../model/servico';
import { ServicoBuilder } from './../../servico/servico.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ProfissionalSaudeBuilder } from './../profissional-saude.builder';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-profissional-saude-form',
    templateUrl: './profissional-saude-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './profissional-saude-form.css']
} )
export class ProfissionalSaudeFormComponent extends GenericFormComponent implements OnInit {
    empregados: Array<Empregado>;
    profissionalSaude: Profissional;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    cursos: Array<Curso>;
    servicos: Array<Servico>;
    servicosSelecteds: Array<Servico>;
    autocompleteEmpregado;
    equipeAux: Equipe;
    
    vencimentoProfissionalConselho: any;
    assinaturaSrc: any;

    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    autoCompleteEmp:EmpregadoNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private profissionalSaudeService: ProfissionalSaudeService,
        router: Router) {
        super( profissionalSaudeService, router );
        this.goTo = "profissional-saude";

        this.empregados = new Array<Empregado>();
        this.profissionalSaude = new ProfissionalSaudeBuilder().initialize( this.profissionalSaude );
        this.servicos = new ServicoBuilder().initializeList( this.servicos );
        this.servicosSelecteds = new Array<Servico>();
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.profissionalSaudeService.getEmpregadoService());
        this.equipeAux = new EquipeBuilder().initialize(this.equipeAux);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.profissionalSaudeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.profissionalSaude = new ProfissionalSaudeBuilder().clone( res.json() );
                            this.servicosSelecteds = this.profissionalSaude.getServicos();
                            this.autoCompleteEmp.getAutocomplete().initializeLastValue(this.profissionalSaude.getEmpregado()
                                    .getPessoa().getNome());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getLocalizacoes();
        this.getCursos();
        this.getEquipes();
        this.getServicos();
    }
    
    getServicos() {
        this.profissionalSaudeService.getServicos()
            .then( res => {
                this.servicos = new ServicoBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getLocalizacoes() {
        this.profissionalSaudeService.getLocalizacoes()
            .then( res => {
                this.localizacoes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getEquipes() {
        this.profissionalSaudeService.getEquipe()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getCursos() {
        this.profissionalSaudeService.getCursos()
            .then( res => {
                this.cursos = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }


    save() {
        this.verifyIfPessoaExist();
        super.save( new ProfissionalSaudeBuilder().clone( this.profissionalSaude ) );
    }

    verifyIfPessoaExist() {
        if ( this.profissionalSaude.getEmpregado().getId() > 0 )
            return true;

        return false;
    }

    addCurriculoCurso() {
        if ( this.profissionalSaude.getCurriculo().getCurriculoCursos() === undefined ) {
            this.profissionalSaude.getCurriculo().setCurriculoCursos( new Array<CurriculoCurso>() );
        }

        let cc: CurriculoCurso = new CurriculoCurso();
        cc.setCurriculo( new Curriculo() );
        cc.setCurso( new Curso() );
        this.profissionalSaude.getCurriculo().getCurriculoCursos().push( cc );
    }
    
    removeCurriculoCurso( i: number ) {
        this.profissionalSaude.getCurriculo().getCurriculoCursos().splice( i, 1 );
    }
    
    addServico(valor: number) {
        if ( valor != 0 ) {
            let serv = this.servicosSelecteds.find(s => s.getId() == valor);
            if ( serv == undefined ) {
                let servico: Servico = this.servicos.find(s => s.getId() == valor);
                this.servicosSelecteds.push(servico);
                this.profissionalSaude.setServicos(this.servicosSelecteds);
            }
        }
    }
    removeServico(i: number) {
        this.profissionalSaude.getServicos().splice(i, 1);
    }
    
    addEquipe() {
        if(this.equipeAux.getId() > 0 && (this.profissionalSaude.getEquipes().find(e=> e.getId() == this.equipeAux.getId() ) == undefined)){
            this.equipeAux = new EquipeBuilder().clone(this.equipes.find(e=> e.getId() == this.equipeAux.getId()));
            this.profissionalSaude.getEquipes().push(new EquipeBuilder().clone(this.equipeAux));
        }
    }
    
    removeEquipe(i: number) {
        this.profissionalSaude.getEquipes().splice(i, 1);
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

}
