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

@Component( {
    selector: 'app-tarefa-form',
    templateUrl: './tarefa-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './tarefa-form.css']
} )
export class TarefaFormComponent extends GenericFormComponent implements OnInit {
    tarefa: Tarefa;
    profissionais: Array<Profissional>;
    validProfissional: string;
    autocompleteProfissional;
    servicos: Array<Servico>;
    equipes: Array<Equipe>;
    r: Router;
    //ngModel
    //    dataAso: any;
    //    dataCurriculoCursos: Array<any>;

    constructor( private route: ActivatedRoute,
        private tarefaService: TarefaService,
        router: Router ) {
        super( tarefaService, router );
        this.goTo = "tarefa";
        this.r = router;

        this.validProfissional = "";
        this.tarefa = new TarefaBuilder().initialize( this.tarefa );
        this.profissionais = new Array<Profissional>();
        this.autocompleteProfissional = [];
        this.servicos = new ServicoBuilder().initializeList( this.servicos );
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
                this.validProfissional = this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome();
                this.saveArrayProfissional();
                this.parseAndSetDates();
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
        this.verifyAndSetDates();
        super.save( new TarefaBuilder().clone( this.tarefa ) );
    }

    getProfissional() {
        if ( this.validProfissional == this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome() ) return;
        if ( this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome() !== undefined ) {
            let profissional = this.profissionais.find( p => {
                if ( ( p.getEmpregado().getChave() + " - " + p.getEmpregado().getPessoa().getNome() ).trim() ==
                    this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome().trim() ||
                    p.getEmpregado().getPessoa().getNome().trim() == this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome().trim() )
                    return true;
                else return false;
            } );

            if ( profissional !== undefined ) {
                this.tarefa.setResponsavel( profissional );
                this.validProfissional = this.tarefa.getResponsavel().getEmpregado().getPessoa().getNome();
            } else this.tarefa.setResponsavel( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
        } else this.tarefa.setResponsavel( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
    }

    private oldNome: string;
    selectProfissional( evento ) {
        if ( this.oldNome != evento ) {
            this.oldNome = evento;
            if ( evento.length > 3 ) {
                this.tarefaService.getProfissionalByName( evento )
                    .then( res => {
                        this.profissionais = new ProfissionalSaudeBuilder().cloneList( res.json() );
                        this.autocompleteProfissional = [this.buildAutocompleteProfissional( this.profissionais )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldNomeByChave: string;
    selectProfissionalByChave( evento ) {
        if ( this.oldNomeByChave != evento ) {
            this.oldNomeByChave = evento;
            this.tarefaService.getProfissionalByChave( evento )
                .then( res => {
                    this.profissionais = new ProfissionalSaudeBuilder().cloneList( res.json() );
                    this.autocompleteProfissional = [this.buildAutocompleteProfissional( this.profissionais )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    buildAutocompleteProfissional( profissionais: Array<Profissional> ) {
        let data = {};
        profissionais.forEach( item => {
            data[item.getEmpregado().getChave() + " - " + item.getEmpregado().getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    saveArrayProfissional() {
        if ( this.tarefa.getResponsavel().getId() > 0 )
            this.profissionais.push( this.tarefa.getResponsavel() );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetDates() {
        //        if ( this.dataAso !== undefined &&
        //            this.dataAso !== null ) {
        //            this.profissionalSaude.setDataAso( this.parseDatePickerToDate( this.dataAso ) );
        //        }
        //
        //        if ( this.profissionalSaude.getCurriculo() !== undefined &&
        //            this.profissionalSaude.getCurriculo() !== null &&
        //            this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined &&
        //            this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
        //
        //            for ( let i = 0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++ ) {
        //                if ( this.dataCurriculoCursos[i] !== undefined &&
        //                    this.dataCurriculoCursos[i] !== null )
        //                    this.profissionalSaude.getCurriculo().getCurriculoCursos()[i].setData(
        //                        this.parseDatePickerToDate( this.dataCurriculoCursos[i] ) );
        //            }
        //        }
        //
        //        if ( this.profissionalSaude.getProfissionalConselho() !== undefined &&
        //            this.profissionalSaude.getProfissionalConselho() !== null ) {
        //            this.profissionalSaude.getProfissionalConselho().
        //                setVencimento( this.parseDatePickerToDate(
        //                    this.vencimentoProfissionalConselho ) );
        //        }
    }

    parseAndSetDates() {
        //        if ( this.profissionalSaude.getDataAso() !== undefined &&
        //            this.profissionalSaude.getDataAso() !== null ) {
        //            this.dataAso = this.parseDataToObjectDatePicker( this.profissionalSaude.getDataAso() );
        //        }
        //
        //        if ( this.profissionalSaude.getCurriculo() !== undefined &&
        //            this.profissionalSaude.getCurriculo() !== null &&
        //            this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined &&
        //            this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
        //
        //            for ( let i = 0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++ ) {
        //                this.dataCurriculoCursos[i] =
        //                    this.parseDataToObjectDatePicker(
        //                        this.profissionalSaude.getCurriculo().getCurriculoCursos()[i].getData() );
        //            }
        //        }
        //
        //        if ( this.profissionalSaude.getProfissionalConselho() !== undefined &&
        //            this.profissionalSaude.getProfissionalConselho() !== null ) {
        //            this.vencimentoProfissionalConselho =
        //                this.parseDataToObjectDatePicker( this.profissionalSaude.getProfissionalConselho().getVencimento() );
        //        }

    }
}