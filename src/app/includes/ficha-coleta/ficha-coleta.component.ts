import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { FichaColeta } from './../../model/ficha-coleta';
import { Triagem } from './../../model/triagem';
import { ItemPerguntaFichaColeta } from './../../model/item-pergunta-ficha-coleta';
import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { Equipe } from './../../model/equipe';
import { ItemRespostaFichaColeta } from './../../model/item-resposta-ficha-coleta';
import { ItemRespostaFichaColetaBuilder } from './../../controller/item-resposta-ficha-coleta/item-resposta-ficha-coleta.builder';
import { CssUtil } from './../../generics/utils/css.util';

@Component( {
    selector: 'app-ficha-coleta',
    templateUrl: './ficha-coleta.html',
    styleUrls: ['./ficha-coleta.css']
} )
export class FichaColetaComponent{
    @Input() fichaColeta;
    @Input() service;
    @Input() idEquipeProfissional;
    @Input() statusFila;
    private innerFichaColeta: FichaColeta;
    private innerIdEquipeProfissional: number;
    
    private simNao: Array<string>;
    private gruposPerguntaFichaColeta;
    private conteudoEnumOrSimNao: Map<number, Array<string>> = new Map<number, Array<string>>();
    private itensResposta: Map<string, Array<string>> = new Map<string, Array<string>>();
    private fuma: RespostaFichaColeta;
    
    private modalConteudo;
    private conteudo: string;
    private idElemento: number;
    private dadosElemento: Array<any>;
    private pattern: string;
    private errorPattern: string;
    
    constructor( router: Router ) {
    }
    
    ngOnInit() {
        this.fuma = new RespostaFichaColeta();
        this.modalConteudo = new EventEmitter<string | MaterializeAction>();
        this.getGrupoPerguntaFichaColeta();
        this.dadosElemento = new Array<any>();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["fichaColeta"] != undefined ) {
            this.innerFichaColeta = changes["fichaColeta"].currentValue;
            this.getFuma();
            this.getStatusSimNao();
        }
        if ( changes["idEquipeProfissional"] != undefined ) {
            this.innerIdEquipeProfissional = changes["idEquipeProfissional"].currentValue;
        }
        if ( changes["statusFila"] != undefined && changes["statusFila"].currentValue != "") {
            this.statusFila = changes["statusFila"].currentValue;
        }
    }
    
    getFuma() {
        this.fuma = this.innerFichaColeta.getRespostaFichaColetas().find(rFC => {
            if ( rFC.getPergunta().getCodigo() == "0008" && rFC.getPergunta().getGrupo() == "ANAMNESE" )
                return true;
            return false;
        });
    }
    
    getStatusSimNao() {
        this.service.getStatusSimNao()
            .then(res => {
                this.simNao = Object.keys(res.json());
                this.seachPathsConteudoPerguntas();
            })
            .catch(error => {
                console.log("Erro ao buscar sim nao");
            })
    }
    
    seachPathsConteudoPerguntas() {
        this.innerFichaColeta.getRespostaFichaColetas().forEach(rFC => {
            if ( rFC.getPergunta().getTipo().includes("SIM") ) {
                this.conteudoEnumOrSimNao.set(rFC.getId(), this.simNao);
                this.constructItensRespostaMap(rFC);
            }
            else if ( rFC.getPergunta().getTipo() == "ENUM" )
                this.service.getEnums( rFC.getPergunta().getPath() )
                    .then(res => {
                        this.conteudoEnumOrSimNao.set(rFC.getId(), Object.keys(res.json()));
                        this.constructItensRespostaMap(rFC);
                    })
                    .catch(error => {
                        console.log("Erro ao buscar path resposta");
                    })
        })
    }
    
    constructItensRespostaMap(resposta: RespostaFichaColeta) {
        for ( let i=0; i < resposta.getPergunta().getItens().length; i++ ) {
            if ( resposta.getPergunta().getItens()[i].getPath() != undefined 
                    && resposta.getPergunta().getItens()[i].getPath() != "" )
                
                this.service.getEnums( resposta.getPergunta().getItens()[i].getPath() )
                    .then(res => {
                        this.itensResposta.set(resposta.getId()+""+i, Object.keys(res.json()));
                    })
                    .catch(error => {
                        console.log("Erro ao buscar path itens respostas")
                    })
        }
    }
    
    getGrupoPerguntaFichaColeta() {
        this.service.getGruposPerguntaFichaColeta()
            .then(res => {
                this.gruposPerguntaFichaColeta = Object.keys(res.json()).sort();
                let flag = this.gruposPerguntaFichaColeta[4];
                this.gruposPerguntaFichaColeta[4] = this.gruposPerguntaFichaColeta[5];
                this.gruposPerguntaFichaColeta[5] = flag;
            })
            .catch(error => {
                console.log("Erro ao buscar os grupos pergunta ficha coleta.");
            })
    }
    
    getRespostasByGrupo(grupo) {
        let respostas = this.innerFichaColeta.getRespostaFichaColetas().filter( rFC =>
            ( rFC.getPergunta().getGrupo() == grupo ) && !rFC.getPergunta().getInativo() );
        respostas.sort(function(a,b) {
            if ( a.getPergunta().getCodigo() > b.getPergunta().getCodigo() )
                return 1;
            if ( a.getPergunta().getCodigo() < b.getPergunta().getCodigo() )
                return -1;
            return 0;
        });
        return respostas;
    }
    
    isEnumOrSimNao(resposta: RespostaFichaColeta) {
        if ( resposta.getPergunta().getTipo() == "ENUM" || resposta.getPergunta().getTipo().includes("SIM") )
            return true;
        return false;
    }
    
    autoAddItem(resposta: RespostaFichaColeta) {
        if ( resposta.getPergunta().getTipo().includes("SIM") ) {
            if ( resposta.getConteudo().includes("N") )
                resposta.setItens(undefined);
            else if ( resposta.getItens() == undefined || resposta.getItens().length == 0 ) {
                let addItem: ItemRespostaFichaColeta = new ItemRespostaFichaColeta();
                let item = addItem;
                for ( let i = 0; i < resposta.getPergunta().getItens().length - 1; i++ ) {
                    addItem.setItem(new ItemRespostaFichaColeta());
                    addItem = item.getItem();
                }
                if ( resposta.getItens() == undefined ) resposta.setItens(new Array<ItemRespostaFichaColeta>())
                resposta.getItens().push(item);
            }
                    
        }
    }
    
    existItem(resposta: RespostaFichaColeta) {
        if ( resposta.getConteudo() == "SIM" && resposta.getPergunta().getItens().length > 0 && resposta.getItens().length > 0 )
            return true;
        return false;
    }
    
    getClassItensResposta(resposta: RespostaFichaColeta) {
        let numCol = resposta.getPergunta().getItens().length;
        return "col s"+Math.floor((10/numCol));
    }
    
    getItensDoItem(item: ItemRespostaFichaColeta) {
        let itens: Array<ItemRespostaFichaColeta> = new Array<ItemRespostaFichaColeta>();
        
        while ( item != undefined ) {
            itens.push(item);
            item = item.getItem();
        }
        
        return itens;
    }
    
    isDisabledResposta(resposta: RespostaFichaColeta) {
        if((!resposta.getVerified())){
            this.permissaoCampo(resposta);
        }
        return !resposta.getEnabled();
    }
    
    
    permissaoCampo(resposta: RespostaFichaColeta){       
        
        let ret: boolean = true;
        let equipe = resposta.getPergunta().getEquipes().find(e => e.getId() == this.innerIdEquipeProfissional);
        if ( this.statusFila == "EM ATENDIMENTO" || this.statusFila == "*" ) {
            if ( resposta.getPergunta().getGrupo() == this.gruposPerguntaFichaColeta[4] ) {
                if ( this.fuma.getConteudo() == "SIM" && equipe != undefined ){
                    ret = false;
                }
                else{                        
                    ret = true;
                }
            } else {
                if ( equipe != undefined ) {
                    ret = false;
                }
                else {
                    ret = true;
                }
            }
        }
        resposta.setVerified(true);
        resposta.setEnabled(!ret);
            
    }
    
    getConteudoEnumOrSimNao(resposta: RespostaFichaColeta) {
        return this.conteudoEnumOrSimNao.get( resposta.getId() );
    }
    
    getItensResposta(resposta: RespostaFichaColeta, indexItemDoItem: number) {
        return this.itensResposta.get( resposta.getId()+""+indexItemDoItem );
    }
    
    isPossibleAddItem(resposta: RespostaFichaColeta) {
        if ( !this.isDisabledResposta(resposta) && 
                resposta.getPergunta().getItens().length > 0 &&
                resposta.getPergunta().getTipo().includes("SIM") &&
                resposta.getConteudo() == "SIM" )
                    return true;
        return false;
    }
    
    addItemResposta(resposta: RespostaFichaColeta) {
        let itens = resposta.getPergunta().getItens();
        let addItem: ItemRespostaFichaColeta = new ItemRespostaFichaColeta;
        let item = addItem;
        let i: number = 0;
        
        for (; i < itens.length - 1; i++) {
            addItem.setItem(new ItemRespostaFichaColeta());
            addItem = addItem.getItem();
        }
         
        resposta.getItens().push(item);
    }
    
    removeItemResposta(resposta: RespostaFichaColeta, i: number) {
        if ( resposta.getItens().length == 1 ) return;
        resposta.getItens().splice(i, 1);
    }
    
    openModalConteudoItem(resposta: RespostaFichaColeta, indexItem: number, indexItemDoItem: number) {
        let elemento = resposta.getItens()[indexItem];
        
        this.modalConteudo.emit( { action: "modal", params: ['open'] } );
        
        for ( let i = 0; i < indexItemDoItem; i++ )
            elemento = elemento.getItem();
        
        this.conteudo = elemento["conteudo"];
        this.dadosElemento = ["item", resposta, indexItem, indexItemDoItem];
        this.pattern = "";
    }
    
    openModalConteudoResposta( resposta: RespostaFichaColeta ) {
        this.modalConteudo.emit( { action: "modal", params: ['open'] } );
        this.dadosElemento = ["resposta", resposta];
        this.conteudo = resposta.getConteudo();
        
        if ( resposta.getPergunta().getTipo() == "INTEIRO" )
            this.pattern = "^[0-9]+$";
        else if ( resposta.getPergunta().getTipo() == "DOUBLE" )
            this.pattern = "^[0-9]+\,?[0-9]*$";
        else this.pattern = "*";
    }
    
    confirmarModalConteudo() {
        let re = new RegExp(this.pattern);
        let r: RespostaFichaColeta = this.innerFichaColeta.getRespostaFichaColetas().find(rFC => 
            rFC.getId() == this.dadosElemento[1]["id"] );
        
        if ( !re.test(this.conteudo) ) {
            console.log(this.pattern);
            this.errorPattern = "Caracteres incorretos.";
            return;
        } else this.errorPattern = "";
        if ( this.dadosElemento[0] == "resposta" ) {
            r.setConteudo(this.conteudo);
        } else {
            let item: ItemRespostaFichaColeta = r.getItens()[this.dadosElemento[2]];
            for( let i = 0; i < this.dadosElemento[3]; i++ )
                item = item.getItem();
            item.setConteudo(this.conteudo);
        }
        
        this.modalConteudo.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalConteudo() {
        this.errorPattern = "";
        this.modalConteudo.emit( { action: "modal", params: ['close'] } );
    }
    
    itemHasPath(resposta: RespostaFichaColeta, indexItem: number, indexItemDoItem: number) {
        if ( resposta.getPergunta().getItens()[indexItemDoItem].getPath() != undefined && 
                resposta.getPergunta().getItens()[indexItemDoItem].getPath() != "" )
            return true;
        return false;   
    }
    
    verifyFuma(resposta){
        if(resposta.getPergunta().getGrupo() == "ANAMNESE" && resposta.getPergunta().getCodigo() == "0008"){
            this.innerFichaColeta.getRespostaFichaColetas().forEach(rFC =>  {
               if(rFC.getPergunta().getGrupo() == this.gruposPerguntaFichaColeta[4]){
                   this.permissaoCampo(rFC);    
               }
            });
        }
    }
    
}