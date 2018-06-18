import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { Tarefa } from './../../../model/tarefa';
import { TarefaService } from './../tarefa.service';
import { TarefaBuilder } from './../tarefa.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Servico } from './../../../model/servico';
import { ServicoBuilder } from './../../servico/servico.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-tarefa-form',
    templateUrl: './tarefa-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './tarefa-form.css']
} )
export class TarefaFormComponent extends GenericFormComponent implements OnInit {
    tarefa: Tarefa;
    servicos: Array<Servico>;
    equipes: Array<Equipe>;
    r: Router;
    private autoCompleteEmp:EmpregadoNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private tarefaService: TarefaService,
        router: Router ) {
        super( tarefaService, router );
        this.goTo = "tarefa";
        this.r = router;

        this.tarefa = new TarefaBuilder().initialize( this.tarefa );
        this.servicos = new ServicoBuilder().initializeList( this.servicos );
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.tarefaService.getEmpregadoService());
    }

    ngOnInit() {
        if ( localStorage.getItem("tarefa-id") == undefined ||
                localStorage.getItem("tarefa-id") == null || 
                localStorage.getItem("tarefa-id") == "" )
            this.r.navigate(["agenda"]);
        
        let id = localStorage.getItem( "tarefa-id" );
        localStorage.removeItem( "tarefa-id" );
        
        this.showPreload = true;

        this.tarefaService.get( Number(id) )
            .then( res => {
                this.showPreload = false;
                this.tarefa = new TarefaBuilder().clone( res.json() );
                this.autoCompleteEmp.getAutocomplete().initializeLastValue(
                        this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome());
            } )
            .catch( error => {
                this.catchConfiguration( error );
            } )

        this.getServicos();
        this.getEquipes();
    }

    getServicos() {
        this.tarefaService.getServicos()
            .then( res => {
                this.servicos = new ServicoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getEquipes() {
        this.tarefaService.getEquipes()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        super.save( new TarefaBuilder().clone( this.tarefa ) );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

}