import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';
import { MaterializeAction } from "angular2-materialize";

import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaBuilder } from './../../profissiograma/profissiograma.builder';
import { Convocacao } from './../../../model/convocacao';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { ConvocacaoBuilder } from './../convocacao.builder';
import { ConvocacaoService } from './../convocacao.service';
import { EmpregadoService } from './../../empregado/empregado.service';
import { GerenciaConvocacao } from './../../../model/gerencia-convocacao';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { EmpregadoConvocacaoBuilder } from './../../empregado-convocacao/empregado-convocacao.builder';
import { GerenciaConvocacaoBuilder } from './../../gerencia-convocacao/gerencia-convocacao.builder';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-convocacao-form',
    templateUrl: './convocacao-form.html',
    styleUrls: ['./convocacao-form.css']
} )
export class ConvocacaoFormComponent extends GenericFormComponent implements OnInit {
    tipos: Array<string>;
    convocacao: Convocacao;
    empregados: Array<Empregado>;
    profissiogramas: Array<Profissiograma>;
    gerenciaConvocacoes: Array<GerenciaConvocacao>;
    empregadoConvocacoes: Array<EmpregadoConvocacao>;
    autocompleteGerenciaConvocacoes = [];
    autocompleteEmpregado = [];
    selectedGerenciaConvocacao: boolean;
    checkBoxSelecteds: Array<boolean>;
    filterGerenciaByCodigoCompleto: any;
    filterChaveEmpregado: any;
    filterNomeEmpregado: any;
    filterGerenciaEmpregado: any;
    empregadoToAdd: Empregado;
    empregadoDetail: EmpregadoConvocacao;
    
    modalEditEmpregado;

    dataGerenciaConvocacaoInicio: Array<any>;
    dataGerenciaConvocacaoFim: Array<any>;

    constructor( private route: ActivatedRoute,
        private convocacaoService: ConvocacaoService,
        private empregadoService: EmpregadoService) {
        super( convocacaoService );

        this.tipos = new Array<string>();
        this.goTo = "convocacao";
        this.convocacao = new ConvocacaoBuilder().initialize( this.convocacao );
        this.empregados = new Array<Empregado>();
        this.empregadoToAdd = new EmpregadoBuilder().initialize(this.empregadoToAdd);
        this.empregadoDetail = new EmpregadoConvocacaoBuilder().initialize(this.empregadoDetail);
        this.profissiogramas = new Array<Profissiograma>();
        this.gerenciaConvocacoes = new Array<GerenciaConvocacao>();
        this.empregadoConvocacoes = new Array<EmpregadoConvocacao>();
        this.selectedGerenciaConvocacao = false;
        this.checkBoxSelecteds = new Array<boolean>();
        this.dataGerenciaConvocacaoInicio = new Array<any>();
        this.dataGerenciaConvocacaoFim = new Array<any>();
        this.modalEditEmpregado = new EventEmitter<string|MaterializeAction>();
    }

    ngOnInit() {
        this.convocacaoService.get( 0 )
            .then( res => {
                this.convocacao = new ConvocacaoBuilder().clone( res.json() );
                this.convocacao.setProfissiograma(new ProfissiogramaBuilder().initialize(new Profissiograma()));
                this.gerenciaConvocacoes = this.convocacao.getGerenciaConvocacoes();
            } )
            .catch( error => {
                console.log( error );
            } )


        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.convocacaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.convocacao = new ConvocacaoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );

        this.convocacaoService.getTipos()
            .then( res => {
                this.tipos = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
        
        this.convocacaoService.getProfissiogramas()
            .then(res => {
                this.profissiogramas = new ProfissiogramaBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }

    save() {
        super.save( new ConvocacaoBuilder().clone( this.convocacao ) );
    }

    filterGerenciaConvocacoes(evento: string) {
        if ( this.convocacao.getGerenciaConvocacoes().length > 0 ) {
            this.gerenciaConvocacoes = this.convocacao.getGerenciaConvocacoes().filter( gC => {
                evento = evento.toLowerCase();
                let lowerCaseCC = gC.getGerencia().getCodigoCompleto().toLowerCase();
                return lowerCaseCC.includes( evento );
            } )
        }
    }

    selectGerenciaConvocacao( index: number ) {
        setTimeout(() => {
            if ( this.gerenciaConvocacoes[index].getSelecionado() == true ) {
                this.selectedGerenciaConvocacao = true;
                this.dataGerenciaConvocacaoInicio[index] = this.gerenciaConvocacoes[index].getInicio();
                this.dataGerenciaConvocacaoFim[index] = this.gerenciaConvocacoes[index].getFim();
                
                let sendConvocacao = new ConvocacaoBuilder().initialize(new Convocacao());
                sendConvocacao.setProfissiograma(this.convocacao.getProfissiograma());
                sendConvocacao.getGerenciaConvocacoes().push(
                        new GerenciaConvocacaoBuilder().clone(this.gerenciaConvocacoes[index]));

                this.convocacaoService.getEmpregadosByGerencia( sendConvocacao )
                    .then( res => {
                        let eCs = new EmpregadoConvocacaoBuilder().cloneList( res.json().empregadoConvocacoes );
                        this.empregadoConvocacoes = this.empregadoConvocacoes.concat(eCs);
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            } else {
                let indexsRemove: Array<number> = new Array<number>();
                this.selectedGerenciaConvocacao = false;
                let empregadoConvocacoes: Array<EmpregadoConvocacao> = this.empregadoConvocacoes.filter( eC => {
                    return JSON.stringify(
                            eC.getEmpregado().getGerencia()) === JSON.stringify(this.gerenciaConvocacoes[index].getGerencia());
                } );
                
                //remover empregados desselecionados do array de empregado convocacoes
                for (let i=0; i < this.empregadoConvocacoes.length; i++) {
                    empregadoConvocacoes.forEach(e => {
                        if ( JSON.stringify(e.getEmpregado()) === JSON.stringify(this.empregadoConvocacoes[i].getEmpregado()) ) {
                            this.empregadoConvocacoes.splice(i, 1);
                        }
                    })
                }
            }
        }, 500 );
    }
    
    getEmpregado(evento) {
        if ( this.empregadoToAdd !== undefined ) {

            let empregado = this.empregados.find( e => {
                return e.getChave() + " - " + e.getPessoa().getNome() ==
                    this.empregadoToAdd.getPessoa().getNome();
            } );

            if ( empregado !== undefined ) {
                this.empregadoToAdd = empregado;
            } else this.empregadoToAdd = new EmpregadoBuilder().initialize(this.empregadoToAdd);
        } else this.empregadoToAdd = new EmpregadoBuilder().initialize(this.empregadoToAdd);
    }
    
    private oldChaveEmpregado: string;
    selectEmpregadoByChave(evento) {
        if ( this.oldChaveEmpregado != evento ) {
            this.oldChaveEmpregado = evento;
            
            this.empregadoService.getEmpregadoByChave(evento)
                .then(res => {
                    this.empregados = new EmpregadoBuilder().cloneList( res.json() );
                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                })
                .catch(error => {
                    console.log(error);
                })
            
        }
    }
    
    addEmpregado() {
        if ( this.empregadoToAdd.getPessoa().getNome() != undefined ) {
            //VERIFICAR SE O EMPREGADO JÁ FOI ADICIONADO
            let eC = new EmpregadoConvocacaoBuilder().initialize(new EmpregadoConvocacao());
            eC.setEmpregado(this.empregadoToAdd)
            this.empregadoConvocacoes.push(eC);
        }
    }
    
    private oldNomeEmpregado: string;
    selectEmpregado(evento: string) {
        if ( this.oldNomeEmpregado != evento ) {
            this.oldNomeEmpregado = evento;
            if (evento.length > 3) {
                this.empregadoService.getEmpregadoByName(evento)
                    .then(res => {
                        this.empregados = new EmpregadoBuilder().cloneList( res.json() );
                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
    
    filterEmpregadoByChave(evento) {
        
    }
    
    filterEmpregadoByNome(evento) {
        
    }
    
    filterEmpregadoByGerencia(evento) {
        
    }
    
    showDetailEmpregado(index: number) {
        this.empregadoDetail = this.empregadoConvocacoes[index];
        let convocacao = new ConvocacaoBuilder().initialize(new Convocacao());
        let eC = new EmpregadoConvocacaoBuilder().initialize(new EmpregadoConvocacao());
        eC.setEmpregado(this.empregadoConvocacoes[index].getEmpregado());
        convocacao.setProfissiograma(this.convocacao.getProfissiograma());
        convocacao.getEmpregadoConvocacoes().push(eC);
        
        this.convocacaoService.getEmpregadoConvocacao(convocacao)
            .then(res => {
                convocacao = new ConvocacaoBuilder().clone(res.json());
                this.empregadoDetail = convocacao.getEmpregadoConvocacoes()[0];
                console.log(this.empregadoDetail);
            })
            .catch(error => {
                console.log(error);
            })
        
        this.openModal();
    }

    verifyAndSetDates() {
        for ( let i = 0; i < this.gerenciaConvocacoes.length; i++ ) {
            if ( this.gerenciaConvocacoes[i].getSelecionado() == true ) {
                if ( this.dataGerenciaConvocacaoInicio[i] != undefined &&
                    this.dataGerenciaConvocacaoInicio[i] != null )
                    this.gerenciaConvocacoes[i].setInicio(
                        this.parseDatePickerToDate( this.dataGerenciaConvocacaoInicio[i] ) );

                if ( this.dataGerenciaConvocacaoFim[i] != undefined &&
                    this.dataGerenciaConvocacaoFim[i] != null )
                    this.gerenciaConvocacoes[i].setFim(
                        this.parseDatePickerToDate( this.dataGerenciaConvocacaoFim[i] ) );

            }
        }
    }

    parseAndSetDates() {
        for ( let i = 0; i < this.gerenciaConvocacoes.length; i++ ) {
            if ( this.gerenciaConvocacoes[i].getSelecionado() == true ) {
                this.dataGerenciaConvocacaoInicio[i] =
                    this.parseDataToObjectDatePicker(
                        this.gerenciaConvocacoes[i].getInicio() );

                this.dataGerenciaConvocacaoFim[i] =
                    this.parseDataToObjectDatePicker(
                        this.gerenciaConvocacoes[i].getFim() );
            }
        }
    }
    
    buildAutocompleteEmpregado( empregados ) {
        let data = {};
        empregados.forEach( item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
    
    openModal() {
        this.modalEditEmpregado.emit({action:"modal",params:['open']});
    }
    
    closeModal() {
        this.modalEditEmpregado.emit({action:"modal",params:['close']});
    }

}







