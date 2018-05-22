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

@Component( {
    selector: 'app-ficha-coleta',
    templateUrl: './ficha-coleta.html',
    styleUrls: ['./ficha-coleta.css']
} )
export class FichaColetaComponent{
    @Input() fichaColeta;
    @Input() service;
    @Input() idEquipeProfissional;
    private innerFichaColeta: FichaColeta;
    private gruposRespostasFichaColeta: Array<string>;
    private respostasFichaColetaByGrupo = [[]];
    private quantidadeItemRespostasByGrupo: Array<number>;
    private statusesSimNao: Array<string>;
    private innerIdEquipeProfissional: number;
    private listPathsEnumPergunta: Array<string>;
    private listEnumsByPathPergunta = [[]];
    private listPathsEnumItem: Array<string>;
    private listEnumsByPathItem = [[]];

    constructor( router: Router ) {
    }
    
    ngOnInit() { 
        this.gruposRespostasFichaColeta = new Array<string>();
        this.quantidadeItemRespostasByGrupo = new Array<number>();
        this.listPathsEnumItem = new Array<string>();
        this.listPathsEnumPergunta = new Array<string>();
        this.getRespostasFichaColeta();
        this.getStatusSimNao();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["fichaColeta"] != undefined ) {
            this.innerFichaColeta = changes["fichaColeta"].currentValue;
            this.getRespostasFichaColeta();
        }
        if ( changes["idEquipeProfissional"] != undefined ) {
            this.innerIdEquipeProfissional = changes["idEquipeProfissional"].currentValue;
        }
    }
    
    getStatusSimNao() {
        this.service.getStatusSimNao()
            .then( res => {
                this.statusesSimNao = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os status." );
            } )
    }
    
    getRespostasFichaColeta() {
        this.gruposRespostasFichaColeta = new Array<string>();
        this.respostasFichaColetaByGrupo = [[]];
        let countIndexGrupo = -1;
        let qtdItens = 1;
        
        this.innerFichaColeta.getRespostaFichaColetas().forEach( r => {
            if ( this.gruposRespostasFichaColeta.find( e => e == r.getPergunta().getGrupo() ) == undefined ) {
                this.gruposRespostasFichaColeta.push( r.getPergunta().getGrupo() );
                countIndexGrupo++;
                qtdItens = 1;
            }
            
            if ( this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()] == undefined ) {
                this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()] = new Array<Triagem>();
            }

            this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()].push( r );
            this.quantidadeItemRespostasByGrupo[countIndexGrupo] = qtdItens++; 
        } )
    }
    
    getGridItensPergunta( itens: Array<ItemPerguntaFichaColeta> ) {
        let s: number = Math.floor( 10 / itens.length );
        return "col s" + s.toString();
    }

    getGridItensResposta( itens: Array<ItemRespostaFichaColeta> ) {
        let s: number = Math.floor( 10 / itens.length );
        return "col s" + s.toString();
    }

    getArrayItensResposta( item: ItemRespostaFichaColeta ) {
        let ret = [];
        
        while ( item != null && item != undefined ) {
            ret.push( item );
            item = item.getItem();
        }

        return ret;
    }

    verifyExistItemResposta( itens ) {
        if ( itens != null ) return true;
        return false;
    }

    contains( texto: string ) {
        let ret: string = "";
        if ( texto == undefined ) return;
        if ( texto.includes( "SIM" ) ) ret = "SIM";
        else if ( texto.includes( "ANAMNESE" ) ) ret = "ANAMNESE";
        else if ( texto.includes( "DOUBLE" ) ) ret = "DOUBLE";
        else if ( texto.includes( "INTEIRO" ) ) ret = "INTEIRO";
        else if ( texto.includes( "TEXTO" ) ) ret = "TEXTO";
        else if ( texto.includes( "ENUM" ) ) ret = "ENUM";
        else if ( texto.includes( "EXAME F" ) ) ret = "EXAMEF";
        else if ( texto.includes( "EXAME ODONTOL" ) ) ret = "EXAMEODONTOL";
        else if ( texto.includes( "BITOS ALIMENTARES" ) ) ret = "BITOSALIMENTARES";
        else if ( texto.includes( "TESTE DE FAGERSTR" ) ) ret = "TESTEDEFAGERSTR";
        else if ( texto.includes( "VEL DE ESTRESSE" ) ) ret = "VELDEESTRESSE";
        return ret;
    }

    selectStatusSimNao( itens, indexGrupo, indexRespostaByGrupo, status ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( status == "SIM" ) {
            this.innerFichaColeta.getRespostaFichaColetas()[indexResposta]
                .setItens( [] );
            this.addItemResposta( itens, indexGrupo, indexRespostaByGrupo );
        } else { 
            this.innerFichaColeta.getRespostaFichaColetas()[indexResposta]
                .setItens( [] );
        }
    }
    
    addItemResposta( itens: Array<ItemPerguntaFichaColeta>, indexGrupo, indexRespostaByGrupo ) {
        let quantidadeItens = itens.length;
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( quantidadeItens == 0 ) 
            return;
        else if ( quantidadeItens == 1 ) {
            this.innerFichaColeta.getRespostaFichaColetas()[indexResposta]
                .getItens().push( new ItemRespostaFichaColeta() );
            return;
        }
        
        let item: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );
        let itemRespostaFichaColeta: ItemRespostaFichaColeta;
        
        if ( item.getItem() != undefined ) {
            
            itemRespostaFichaColeta = item.getItem();
        
            for ( let i = 0; i < quantidadeItens-2; i++ ) {
                itemRespostaFichaColeta.setItem(new ItemRespostaFichaColeta());
                itemRespostaFichaColeta = itemRespostaFichaColeta.getItem(); 
            }
        }
                
        this.innerFichaColeta.getRespostaFichaColetas()[indexResposta]
            .getItens().push( item );
    }
    
    constructItemRespostaFichaColeta( quantidadeItens: number, itemRespostaFichaColeta: ItemRespostaFichaColeta ) {
        if ( quantidadeItens <= 3 ) return;
        quantidadeItens--;
        
        let item: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );

        itemRespostaFichaColeta.setItem( item );
        this.constructItemRespostaFichaColeta( quantidadeItens, item );
    }
    
    removeItemResposta( indexGrupo, indexRespostaByGrupo, itemIndex ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( this.innerFichaColeta.getRespostaFichaColetas()[indexResposta].getItens().length == 1 ) return;

        this.innerFichaColeta.getRespostaFichaColetas()[indexResposta].getItens().splice( itemIndex, 1 );
    }
    
    verifyRespostaSimNao( resposta: RespostaFichaColeta ) {
        if ( resposta.getItens() != undefined && resposta.getItens().length > 0 )
            return true;
        else return false;
    }
    
    getIndexRespostaByGrupo( indexGrupo, itemIndex ) {
        let quantidadeItensAnteriores = this.getQuantidadeItensAnteriores( indexGrupo );
        
        return quantidadeItensAnteriores + itemIndex;
    }
    
    getQuantidadeItensAnteriores( indexGrupo ) {
        let qtdItens = 0;
        for ( let i=0; i < indexGrupo; i++ )
            qtdItens += this.quantidadeItemRespostasByGrupo[i];
        
        return qtdItens;
    }
    
    verifyEquipe( resposta: RespostaFichaColeta ) {
        let resp: RespostaFichaColeta = this.innerFichaColeta.getRespostaFichaColetas()
            .find( r => r.getPergunta().getGrupo() == 'ANAMNESE' && r.getPergunta().getCodigo() == '0008' &&
                        r.getConteudo() == 'SIM');
        
        let e: Equipe = resposta.getPergunta().getEquipes()
            .find( e => e.getId() == this.innerIdEquipeProfissional );
    
        if(resposta.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" )){
            if(e != undefined && resp != undefined) return false;
        }else{
            if(e != undefined) return false;
        }

        return true;
    }
    
    getEnumsPergunta( resposta: RespostaFichaColeta ) {
        let path = resposta.getPergunta().getPath();
        
        if ( this.listPathsEnumPergunta.find(l => l == path) == undefined ) {
            this.service.getEnums(path)
                .then(res => {
                    this.listPathsEnumPergunta.push(path);
                    this.listEnumsByPathPergunta[path] = new Array<string>();
                    this.listEnumsByPathPergunta[path] = Object.keys( res.json() ).sort();
                })
                .catch(error => {
                    console.log("Erro ao retornar enums");
                    return [];
                })
        }

        return this.listEnumsByPathPergunta[path];
    }

    getEnumsItem( resposta: RespostaFichaColeta, indexPath: number ) {
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( this.listPathsEnumItem.find(l => l == path) == undefined ) {
            this.service.getEnums(path)
                .then(res => {
                    this.listPathsEnumItem.push(path);
                    this.listEnumsByPathItem[path] = new Array<string>();
                    this.listEnumsByPathItem[path] = Object.keys( res.json() ).sort();
                })
                .catch(error => {
                    console.log("Erro ao retornar enums");
                    return [];
                })
        } 

        return this.listEnumsByPathItem[path];
    }
    
    verifyItemPath( resposta: RespostaFichaColeta, indexPath: number ) {
        if ( resposta.getPergunta().getItens()[indexPath] == undefined ) return;
        
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( path != undefined && path != '' )
            return true;
        
        return false;
    }
    
}