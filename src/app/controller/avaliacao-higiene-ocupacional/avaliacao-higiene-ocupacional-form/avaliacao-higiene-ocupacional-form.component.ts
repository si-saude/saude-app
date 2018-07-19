import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { AvaliacaoHigieneOcupacional } from './../../../model/avaliacao-higiene-ocupacional';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AvaliacaoHigieneOcupacionalBuilder } from './../avaliacao-higiene-ocupacional.builder';
import { AvaliacaoHigieneOcupacionalService } from './../avaliacao-higiene-ocupacional.service';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { Profissional } from './../../../model/profissional';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-avaliacao-higiene-ocupacional-form',
    templateUrl: './avaliacao-higiene-ocupacional-form.html',
    styleUrls: ['./avaliacao-higiene-ocupacional-form.css', './../../../../assets/css/form-component.css']
} )
export class AvaliacaoHigieneOcupacionalFormComponent extends GenericFormComponent implements OnInit {
    private avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional;
    private usuario: Usuario;
    private profissional: Profissional;
    private localizacoes: Array<Localizacao>;
    private ensaioVedacoes: Array<string>;
    private empregadoNomeAutocomplete: EmpregadoNomeAutocomplete;
    private inicioTimeActions;
    private fimTimeActions;
    
    constructor( private route: ActivatedRoute,
        private avaliacaoHigieneOcupacionalService: AvaliacaoHigieneOcupacionalService,
        router: Router) {
        super( avaliacaoHigieneOcupacionalService, router );

        this.goTo = "avaliacao-higiene-ocupacional";
        this.avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacionalBuilder().initialize( this.avaliacaoHigieneOcupacional );
        this.empregadoNomeAutocomplete = new EmpregadoNomeAutocomplete( this.avaliacaoHigieneOcupacionalService.getEmpregadoService());
        this.inicioTimeActions = new EventEmitter<string|MaterializeAction>();
        this.fimTimeActions = new EventEmitter<string|MaterializeAction>();
        this.ensaioVedacoes = new Array<string>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.avaliacaoHigieneOcupacionalService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacionalBuilder().clone( res.json() );
                            this.empregadoNomeAutocomplete.getAutocomplete().initializeLastValue(
                                    this.avaliacaoHigieneOcupacional.getEmpregado().getPessoa().getNome() );
                            console.log(this.avaliacaoHigieneOcupacional.getEnsaioVedacao())
                            this.getLocalizacoes();
                            this.getEnsaioVedacoes();
                        } )
                         .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    if ( localStorage.getItem( 'usuario-id' ) != undefined ) {
                        this.avaliacaoHigieneOcupacionalService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
                            .then( res => {
                                this.usuario = new UsuarioBuilder().clone( res.json() );
                                let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                                profissionalFilter.setEmpregado(new EmpregadoFilter());
                                profissionalFilter.getEmpregado().setPessoa(new PessoaFilter());
                                profissionalFilter.getEmpregado().getPessoa().setCpf(this.usuario.getPessoa().getCpf());
                                this.avaliacaoHigieneOcupacionalService.getProfissional(profissionalFilter)
                                    .then(res => {
                                        if ( res.json().total > 0 ) {
                                            this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                            this.avaliacaoHigieneOcupacional.setTecnico(this.profissional);
                                            this.getLocalizacoes();
                                            this.getEnsaioVedacoes();
                                        }
                                        else this.router.navigate( ["/home"] ); 
                                    })
                                    .catch(error => {
                                        console.log("Erro ao buscar profissional.");
                                        this.router.navigate( ["/home"] );
                                    })
                            })
                            .catch( error => {
                                console.log("Erro ao buscar usuario.");
                                this.router.navigate( ["/home"] );
                            })
                    }
                }
            } );
    }

    getLocalizacoes() {
        this.avaliacaoHigieneOcupacionalService.getLocalizacoes()
            .then(res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar as localizacoes.");
            })
    }
    
    getEnsaioVedacoes() {
        this.avaliacaoHigieneOcupacionalService.getEnsaioVedacao()
            .then(res => {
                this.ensaioVedacoes = Object.keys( res.json() ).sort();
                console.log(this.ensaioVedacoes);
            })
            .catch(error => {
                console.log("Erro ao buscar os ensaios vedacoes.");
            })
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new AvaliacaoHigieneOcupacionalBuilder().clone( this.avaliacaoHigieneOcupacional ) );
    }
    
    getValueEnsaioVedacao(value) {
        switch(value) {
            case "nao":
                return this.ensaioVedacoes[0];
            case "sim":
                return this.ensaioVedacoes[2];
            case "naoAplicavel":
                return this.ensaioVedacoes[1];
        }
    }
    
    getEnsaioVedacao() {
        if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao() == undefined ) return "";
        else if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao().includes("APLIC") )
            return "naoAplicavel";
        else if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao().includes("N") )
            return "nao";
        else return "sim";
    }
    
    setEnsaioVedacao( value ) {
        switch(value) {
            case "nao":
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[0]);
                break;
            case "naoAplicavel":
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[1]);
                break;
            case "sim":
                console.log('teste')
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[2]);
                break;
        }
    }
}