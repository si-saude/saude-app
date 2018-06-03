import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { UsuarioFilter } from './../controller/usuario/usuario.filter';
import { Tarefa } from './../model/tarefa';
import { TarefaFilter } from './../controller/tarefa/tarefa.filter';
import { TarefaBuilder } from './../controller/tarefa/tarefa.builder';
import { Profissional } from './../model/profissional';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../controller/profissional-saude/profissional-saude.builder';
import { Empregado } from './../model/empregado';
import { EmpregadoFilter } from './../controller/empregado/empregado.filter';
import { EmpregadoBuilder } from './../controller/empregado/empregado.builder';
import { EquipeBuilder } from './../controller/equipe/equipe.builder';
import { SolicitacaoCentralIntegra } from './../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraFilter } from './../controller/solicitacao-central-integra/solicitacao-central-integra.filter';
import { SolicitacaoCentralIntegraBuilder } from './../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { SolicitacaoCentralIntegraService } from './../controller/solicitacao-central-integra/solicitacao-central-integra.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SolicitacaoCentralIntegraUtil } from './../generics/utils/solicitacao-central-integra.util';
import { HttpUtil } from './../generics/utils/http.util';
@Component( {
    selector: 'app-kanban',
    templateUrl: './kanban.html',
    styleUrls: ['./kanban.css']
} )
export class KanbanComponent {
    private profissional: Profissional;
    private usuario: Usuario;
    private solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegra>;
    private statuses: Array<string>;
    private router: any;
    private responsavel: Profissional;
    private responsaveis: Array<Profissional>;
    private solicitacaoCentralIntegraUtil: SolicitacaoCentralIntegraUtil;
    private httpUtil: HttpUtil;

    private showPreload: boolean;
    private toastParams;
    private globalActions;

    constructor( router: Router, private kanbanService: SolicitacaoCentralIntegraService,
            private dragulaService: DragulaService) {
        this.solicitacaoCentralIntegras = new Array<SolicitacaoCentralIntegra>();
        this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
        this.statuses = new Array<string>();
        this.router = router;
        this.responsavel = new ProfissionalSaudeBuilder().initialize(new Profissional());
        this.responsaveis = new ProfissionalSaudeBuilder().initializeList(new Array<Profissional>());
        dragulaService.drop.subscribe((value) => {
            this.drop(value);
          });
        this.solicitacaoCentralIntegraUtil = new SolicitacaoCentralIntegraUtil();
        this.httpUtil = new HttpUtil();
        
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.showPreload = false;
    }
    
    ngOnInit() {
        let component = this;
        this.showPreload = true;
        if ( localStorage.getItem( 'usuario-id' ) != undefined ) {
            component.kanbanService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
                .then( res => {
                    component.usuario = new UsuarioBuilder().clone( res.json() );
                    let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                    let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                    empregadoFilter.getPessoa().setCpf( component.usuario.getPessoa().getCpf() );
                    profissionalFilter.setEmpregado( empregadoFilter );
                    component.kanbanService.getProfissional( profissionalFilter )
                        .then( res => {
                            component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                            component.kanbanService.getEquipe(component.profissional.getEquipe().getId())
                                .then(res => {
                                    this.showPreload = false;
                                    this.profissional.setEquipe(new EquipeBuilder().clone(res.json()));
                                    component.getSolicitacoes();
                                })
                                .catch(error => {
                                    console.log("Erro ao buscar equipe do profissional.");
                                })
                        } )
                        .catch( error => {
                            console.log( "Erro no servidor ao buscar o profissional." );
                        } )
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                } )
        } else {
            component.router.navigate( ["login"] );
        }
     
    }
    
    //generalizar solicitacaoCentralIntegraUtil
    getAnexo( solicitacaoCentralIntegra: SolicitacaoCentralIntegra ) {
        this.showPreload = true;
        
        this.kanbanService.getAnexo(solicitacaoCentralIntegra.getId())
            .then(res => {
                this.showPreload = false;
                this.httpUtil.downloadFile(res, solicitacaoCentralIntegra.
                        getTarefa().getCliente().getPessoa().getNome()+".zip");
            })
            .catch(error => {
                this.showPreload = false;
                if ( typeof error.text === "function") {
                    this.toastParams = [error.text(), 6000];
                    this.globalActions.emit('toast');
                    return;
                } else console.log("Erro ao buscar o anexo: "+error);
            })
    }
    
    setResponsaveis() {
        let id = $("select[name=responsavel]").val();
        this.responsaveis = new Array<Profissional>();
        this.solicitacaoCentralIntegras.forEach(sCI => {
           if ( sCI.getTarefa().getResponsavel() != undefined )
               this.responsaveis.push(sCI.getTarefa().getResponsavel()); 
        });
    }
    
    getSolicitacoes() {
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        if ( !this.verifyCoordenador() ) {
            solicitacaoCentralIntegraFilter.setTarefa(new TarefaFilter());
            solicitacaoCentralIntegraFilter.getTarefa().setResponsavel(new ProfissionalSaudeFilter());
            solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId(this.profissional.getId());
        }
        solicitacaoCentralIntegraFilter.setPageSize(Math.pow(2, 31)-1);
        solicitacaoCentralIntegraFilter.setPageNumber(1);
        this.kanbanService.getSolicitacoes(solicitacaoCentralIntegraFilter)
            .then(res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList(res.json().list);
                this.constructCardsSolicitacoes();
                this.setResponsaveis();
            })
            .catch(error => {
                console.log("Erro ao buscar as solicitcoes central integra");
            })
    }
    
    changeResponsavel( id: number ) {
        if ( id == 0 ) {
            this.getSolicitacoes();
        }
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        solicitacaoCentralIntegraFilter.setTarefa(new TarefaFilter());
        solicitacaoCentralIntegraFilter.getTarefa().setResponsavel(new ProfissionalSaudeFilter());
        solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId(id);
        this.kanbanService.list(solicitacaoCentralIntegraFilter)
            .then(res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList(res.json().list);
                this.constructCardsSolicitacoes();
            })
            .catch(error => {
                console.log("Erro ao buscar as solicitacoees central integra");
            })
    }
    
    drop(valor) {
        let id = $(valor[1]).attr('name').split("-")[1];
        let changeStatus = $(valor[2]).attr('id');
        let solicitacaoCentralIntegra: SolicitacaoCentralIntegra = this.solicitacaoCentralIntegras.
            find(sCI => sCI.getId() == Number(id));
        solicitacaoCentralIntegra.setStatus(changeStatus);
        this.kanbanService.submit(solicitacaoCentralIntegra)
            .then(res => {
                solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone(res.json());
            })
            .catch(error => {
                console.log("Erro ao atualizar a solicitação.");
            })
            
    }
    
    constructCardsSolicitacoes() {
        let component = this;
        this.removeChildres();
        this.solicitacaoCentralIntegras.forEach(sCI => {
            $(".body-kanban-"+sCI.getStatus()).append(
                    "<div style='margin-left: 5%; width: 90%;' name='card-"+ sCI.getId() +"' class='row card card-"+ sCI.getId() + "' [dragula]='card'>" + 
                        "<div class='col s10 card-content'>"+ this.showShortDescricao(sCI.getDescricao()) + "</div> " +
                        "<i style='cursor: pointer;' class='small material-icons icon icon-"+sCI.getId()+"'>file_download</i>"+
            		"</div> ");
        })
        this.solicitacaoCentralIntegras.forEach(sCI => {
            $(".card-"+sCI.getId()).dblclick(function() {
                if ( component.verifyCoordenador() )
                    component.router.navigate(["/solicitacao-central-integra/editar", sCI.getId()]);
                else component.router.navigate(["/solicitacao-central-integra/observacao", sCI.getId()]);
            });
            $(".icon-"+sCI.getId()).click(function() {
                component.getAnexo(sCI);
            });
        })
    }
    
    removeChildres() {
        this.statuses.forEach(s => {
            $(".body-kanban-"+s).empty();
        })
    }
        
    showShortDescricao( descricao: string ) {
        if ( descricao.length > 100 )
            return descricao.substring(0, 97)+"...";
        else return descricao;
    }
    
    verifyStatus(status: string) {
        if ( status == "ABERTO" && !this.verifyCoordenador() )
            return false;
        return true;
    }
    
    verifyCoordenador() {
        if ( this.profissional.getEquipe().getCoordenador().getId() == this.profissional.getId() )
            return true;
        else return false;
    }
    
    ngOnDestroy() {
    }

}