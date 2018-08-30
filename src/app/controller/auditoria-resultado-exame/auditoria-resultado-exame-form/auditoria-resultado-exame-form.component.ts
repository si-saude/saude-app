import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { CampoExame } from './../../../model/campo-exame';
import { CampoExameBuilder } from './../../campo-exame/campo-exame.builder';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { ResultadoExame } from './../../../model/resultado-exame';
import { ItemResultadoExame } from './../../../model/item-resultado-exame';
import { ItemResultadoExameBuilder } from './../../item-resultado-exame/item-resultado-exame.builder';
import { ResultadoExameBuilder } from './../../resultado-exame/resultado-exame.builder';
import { EmpregadoConvocacaoService } from './../../empregado-convocacao/empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './../../empregado-convocacao/empregado-convocacao.filter';
import { EmpregadoConvocacaoBuilder } from './../../empregado-convocacao/empregado-convocacao.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-auditoria-resultado-exame-form',
    templateUrl: './auditoria-resultado-exame-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './auditoria-resultado-exame-form.css']
} )

export class AuditoriaResultadoExameFormComponent extends GenericFormComponent implements OnInit {
    empregadoConvocacao: EmpregadoConvocacao;
    resultadoExame: ResultadoExame;
    campoExames: Array<CampoExame>;
    empregadoConvocacoes: Array<EmpregadoConvocacao>;
    arrayExames: Array<Exame>;
    acoes: Array<string>;
    tipos: Array<string>;
    itemResultadoExames: Array<ItemResultadoExame>;
    conformList: Array<boolean>;
    selecionarTodos: boolean;
    canAuditar: boolean;
    empConv: string;
    examesAdded: Array<Exame>;
    autocompleteEmpregadoConvocacao;
    autocompleteExame;
    data: any;
    validExame: string;

    dataResultadoExames: Array<any>;
    dataRecebimentoExames: Array<any>;
    dataItemResultadoExames: Array<any>;

    selectedExm = null;
    dateActions;
    params;
    
    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService,
        router: Router ) {
        super( empregadoConvocacaoService, router );
        this.goTo = "auditoria-resultado-exame";

        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.resultadoExame = new ResultadoExameBuilder().initialize( this.resultadoExame );
        this.arrayExames = new ExameBuilder().initializeList( this.arrayExames );
        this.itemResultadoExames = new ItemResultadoExameBuilder().initializeList( this.itemResultadoExames );
        this.conformList = new Array<boolean>();
        this.examesAdded = new Array<Exame>();
        this.canAuditar = false;
        this.dataResultadoExames = new Array<any>();
        this.dataRecebimentoExames = new Array<any>();
        this.dataItemResultadoExames = new Array<any>();
        this.campoExames = new CampoExameBuilder().initializeList( this.campoExames );
        this.empregadoConvocacoes = new Array<EmpregadoConvocacao>();
        this.autocompleteEmpregadoConvocacao = [];
        this.validExame = "";
        this.dateActions = new EventEmitter<string|MaterializeAction>();
        this.params = GlobalVariable.PARAMS_DATE;
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.empregadoConvocacaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().clone( res.json() );
                            this.saveArrayExames();
                            this.empConv = this.empregadoConvocacao.getConvocacao().getTitulo() + " - " + this.empregadoConvocacao.getEmpregado().getPessoa().getNome();
                            if ( this.empregadoConvocacao.getResultadoExames() != undefined &&
                                this.empregadoConvocacao.getResultadoExames() != null ) {
                                for ( let i = 0; i < this.empregadoConvocacao.getResultadoExames().length; i++ ) {
                                    if ( this.empregadoConvocacao.getResultadoExames()[i].getConforme() == true )
                                        this.conformList[i] = true;
                                    else this.conformList[i] = false;
                                }
                            }
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getAcaoResultadoExames();
        this.getTipoResultadoExames();
    }

    getAcaoResultadoExames() {
        this.empregadoConvocacaoService.getAcaoResultadoExames()
            .then( res => {
                this.acoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getTipoResultadoExames() {
        this.empregadoConvocacaoService.getTipoResultadoExames()
            .then( res => {
                this.tipos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        super.save( new EmpregadoConvocacaoBuilder().clone( this.empregadoConvocacao ) );
    }

    addResultadoExame() {
        let re = new ResultadoExameBuilder().initialize( new ResultadoExame() );

        this.empregadoConvocacao.getResultadoExames().push( re );

        this.empregadoConvocacao.setResultadoAuditado( false );
        this.conformList[this.empregadoConvocacao.getResultadoExames().length - 1] = false;
    }

    removeResultadoExame( value ) {
        this.empregadoConvocacao.getResultadoExames().splice( value, 1 );
        this.conformList.splice( value, 1 );
    }

    addItemResultadoExame( iREx, value ) {
        if ( value == 0 ) return;

        let campoExame: CampoExame = this.campoExames.find( c => c.getId() == value );

        let flagIREx = this.empregadoConvocacao.getResultadoExames()[iREx].getItemResultadoExames().find( iRE =>
            iRE.getCodigo() == campoExame.getCodigo()
        );

        if ( flagIREx != undefined ) {
            this.toastParams = ['Item adicionado anteriormente', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        let itemResultadoExame: ItemResultadoExame = new ItemResultadoExame();

        itemResultadoExame.setCodigo( campoExame.getCodigo() );
        itemResultadoExame.setTitulo( campoExame.getTitulo() );
        itemResultadoExame.setResultado( "" );

        this.empregadoConvocacao.getResultadoExames()[iREx].getItemResultadoExames().push( itemResultadoExame );
    }

    removeItemResultadoExame( indexResultadoExame, indexItem ) {
        this.empregadoConvocacao.getResultadoExames()[indexResultadoExame].getItemResultadoExames().splice( indexItem, 1 );
    }

    selectConform( value ) {
        setTimeout(() => {
            this.conformList[value] = this.empregadoConvocacao.getResultadoExames()[value].getConforme();
        }, 100 );
    }

    verifyAuditado() {
        let ret: boolean = this.conformList.find( cL => cL == false );
        if ( ret == undefined ) return true;
        else {
            this.empregadoConvocacao.setResultadoAuditado( false );
            return false;
        }
    }

    selectAll() {
        setTimeout(() => {
            if ( this.selecionarTodos == false )
                this.empregadoConvocacao.getResultadoExames().forEach( eRE => {
                    eRE.setConforme( false );
                    for ( let i = 0; i < this.conformList.length; i++ )
                        this.conformList[i] = false;
                } );
            else
                this.empregadoConvocacao.getResultadoExames().forEach( eRE => {
                    eRE.setConforme( true );
                    for ( let i = 0; i < this.conformList.length; i++ )
                        this.conformList[i] = true;
                } );
        }, 100 );
    }


    focusExame(evento, indexREx) {
        this.validExame = this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao();
    }
    
    getExame(evento, indexREx) {
        if ( this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao() == "" )
            this.empregadoConvocacao.getResultadoExames()[indexREx] = new ResultadoExameBuilder().initialize(new ResultadoExame());
        
        if ( this.validExame == this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao() ) return;
        
        if ( this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao() !== undefined ) {
            let exame = this.arrayExames.find( ex => {
                if ( ( ex.getCodigo() + " - " + ex.getDescricao() ).trim() ==
                     ( this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao() ).trim() ||
                    ex.getDescricao().trim() == 
                        this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao().trim() )
                    return true;
                else return false;
            } );
            if ( exame !== undefined ) {
                
                let flag = false;
                if(this.empregadoConvocacao.getResultadoExames()[indexREx].getExame() == undefined ||
                        this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getCodigo() != exame.getCodigo()){
                    flag = true;
                }
                
                this.empregadoConvocacao.getResultadoExames()[indexREx].setExame(exame);
                this.validExame == this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getDescricao();
                
                if(flag){
                    this.choiseCampoExame(indexREx,true);                    
                }
            } else this.empregadoConvocacao.getResultadoExames()[indexREx] = new ResultadoExameBuilder().initialize(new ResultadoExame()); 
        } else this.empregadoConvocacao.getResultadoExames()[indexREx] = new ResultadoExameBuilder().initialize(new ResultadoExame());
    }

    private oldNome: string;
    selectExameByDescricao( evento, iREx ) {
        if ( this.oldNome != evento ) {
            this.oldNome = evento;
            if ( evento.length > 3 ) {
                this.empregadoConvocacaoService.getExameByDescricao( evento )
                    .then( res => {
                        this.arrayExames = new ExameBuilder().cloneList( res.json() );
                        //remove os exames que ja existe nos resultados exames
                        this.empregadoConvocacao.getResultadoExames().forEach( rE => {
                            let aE = this.arrayExames.find( a => a.getCodigo() == rE.getExame().getCodigo() );
                            if ( aE != undefined)
                                this.arrayExames.splice( this.arrayExames.indexOf(aE), 1 );    
                        })
                        this.autocompleteExame = [this.buildAutocompleteExame( this.arrayExames )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldNomeByCodigo: string;
    selectExameByCodigo( evento, iREx ) {
        if ( this.oldNomeByCodigo != evento ) {
            this.oldNomeByCodigo = evento;
            this.empregadoConvocacaoService.getExameByCodigo( evento )
                .then( res => {
                    this.arrayExames = new ExameBuilder().cloneList( res.json() );
                  //remove os exames que ja existe nos resultados exames
                    this.empregadoConvocacao.getResultadoExames().forEach( rE => {
                        let aE = this.arrayExames.find( a => a.getCodigo() == rE.getExame().getCodigo() );
                        if ( aE != undefined)
                            this.arrayExames.splice( this.arrayExames.indexOf(aE), 1 );    
                    })
                    this.autocompleteExame = [this.buildAutocompleteExame( this.arrayExames )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    buildAutocompleteExame( exames: Array<Exame> ) {
        let data = {};
        exames.forEach( item => {
            data[item.getCodigo() + " - " + item.getDescricao()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
    
    choiseCampoExame( indexREx, flag ) {
        let exame: Exame;
    
        this.empregadoConvocacaoService.getExameById(this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getId())
            .then(res => {
                exame = new ExameBuilder().clone(res.json());
                this.campoExames = exame.getCampoExames();
                
                if(flag){
                    this.empregadoConvocacao.getResultadoExames()[indexREx].setItemResultadoExames(new ItemResultadoExameBuilder().cloneList(new Array<ItemResultadoExame>()));
                    
                    this.campoExames.forEach( cE => {
                        this.addItemResultadoExame(indexREx, cE.getId());
                    });            
                }
            })
            .catch(error => {
                console.log("Erro ao buscar o exame.");
            })
    }

    saveArrayExames() {
        if ( this.empregadoConvocacao.getResultadoExames().length > 0 ) {
            this.empregadoConvocacao.getResultadoExames().forEach(rE => {
                this.arrayExames.push( rE.getExame() );
            })
        }
    }

}