import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

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
    exames: Array<Exame>;
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

    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService,
        router: Router ) {
        super( empregadoConvocacaoService, router );
        this.goTo = "auditoria-resultado-exame";

        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.resultadoExame = new ResultadoExameBuilder().initialize( this.resultadoExame );
        this.exames = new ExameBuilder().initializeList( this.exames );
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
                            this.parseAndSetDates();
                            this.treatDateItemResultadoExame();
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

        this.getExamesAll();
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

    getExamesAll() {
        this.empregadoConvocacaoService.getExamesAll()
            .then( res => {
                this.exames = new ExameBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                this.catchConfiguration( error );
            } )
    }

    save() {
        this.verifyAndSetDates();
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
    
    treatDateItemResultadoExame() {
        for ( let i=0; i<this.empregadoConvocacao.getResultadoExames().length; i++ ) {
            let iRExame: ItemResultadoExame = this.empregadoConvocacao.getResultadoExames()[i].getItemResultadoExames().
                find(iREx => iREx.getCodigo() == "010");
            if ( iRExame != undefined )
                this.dataItemResultadoExames[i] = this.parseItemResultadoExameDataToObjectDatePicker( iRExame.getResultado() );
        }
    }

    verifyAuditado() {
        let ret: boolean = this.conformList.find( cL => cL == false );
        if ( ret == undefined ) return true;
        else {
            this.empregadoConvocacao.setResultadoAuditado( false );
            return false;
        }
    }

    selectExame( iREx, exameId ) {
        if ( exameId == 0 ) return;

        let exame = this.exames.find( e => e.getId() == exameId );

        this.campoExames = exame.getCampoExames();
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

    verifyAndSetDates() {
        if ( this.empregadoConvocacao.getResultadoExames() !== undefined &&
            this.empregadoConvocacao.getResultadoExames() !== null ) {
            for ( let i = 0; i < this.empregadoConvocacao.getResultadoExames().length; i++ ) {
                this.empregadoConvocacao.getResultadoExames()[i].setData(
                    this.parseDatePickerToDate( this.dataResultadoExames[i] ) );

                this.empregadoConvocacao.getResultadoExames()[i].setDataRecebimento(
                    this.parseDatePickerToDate( this.dataRecebimentoExames[i] ) );
                
                this.empregadoConvocacao.getResultadoExames()[i].getItemResultadoExames().forEach(iREx => {
                    if ( iREx.getCodigo() == "010") {
                        iREx.setResultado( this.parseDatePickerToItemResultadoExameDate( this.dataItemResultadoExames[i] ) );
                    }
                })
            }
        }
    }

    parseAndSetDates() {
        if ( this.empregadoConvocacao.getResultadoExames() !== undefined &&
            this.empregadoConvocacao.getResultadoExames() !== null ) {
            for ( let i = 0; i < this.empregadoConvocacao.getResultadoExames().length; i++ ) {
                this.dataResultadoExames[i] =
                    this.parseDataToObjectDatePicker(
                        this.empregadoConvocacao.getResultadoExames()[i].getData() );

                this.dataRecebimentoExames[i] =
                    this.parseDataToObjectDatePicker(
                        this.empregadoConvocacao.getResultadoExames()[i].getDataRecebimento() );
            }
        }
    }
    
    parseItemResultadoExameDataToObjectDatePicker( data: string ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        
        let mes = data.substring( 4, 6 );
        let dia = data.substring( 6, 8 );
        
        if ( mes.substring(0, 1) == "0" ) mes = mes.replace("0", ""); 
        if ( dia.substring(0, 1) == "0" ) dia = dia.replace("0", "");
        
        let o = Object.create( 
                { date: 
                    { year: data.substring( 0, 4 ), month: mes, day: dia } 
                });
        return o;
    }
    
    parseDatePickerToItemResultadoExameDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        }
        let ano: string = (data.date.year).toString();
        let mes: string = ( data.date.month ).toString();
        let dia: string = (data.date.day).toString();

        if ( mes.length == 1 ) mes = "0"+ mes.toString();
        if ( dia.length == 1 ) dia = "0"+ dia.toString();
        
        let d: string = ano + mes + dia;
        
        return d;
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
        let exame = this.exames.find( e => e.getCodigo() == this.empregadoConvocacao.getResultadoExames()[indexREx].getExame().getCodigo());
        
        this.campoExames = exame.getCampoExames();
        
        if(flag){
            this.empregadoConvocacao.getResultadoExames()[indexREx].setItemResultadoExames(new ItemResultadoExameBuilder().cloneList(new Array<ItemResultadoExame>()));
            
            this.campoExames.forEach( cE => {
                this.addItemResultadoExame(indexREx, cE.getId());
            });            
        }
    }

    saveArrayExames() {
        if ( this.empregadoConvocacao.getResultadoExames().length > 0 ) {
            this.empregadoConvocacao.getResultadoExames().forEach(rE => {
                this.arrayExames.push( rE.getExame() );
            })
        }
    }

}