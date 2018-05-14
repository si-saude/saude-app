import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FichaColeta } from './../../../model/ficha-coleta';
import { FichaColetaBuilder } from './../../ficha-coleta/ficha-coleta.builder';
import { ItemRespostaFichaColeta } from './../../../model/item-resposta-ficha-coleta';
import { ItemPerguntaFichaColeta } from './../../../model/item-pergunta-ficha-coleta';
import { FilaEsperaOcupacionalFilter } from './../../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { FilaEsperaOcupacionalService } from './../../fila-espera-ocupacional/fila-espera-ocupacional.service';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RespostaFichaColeta } from './../../../model/resposta-ficha-coleta';
import { Equipe } from './../../../model/equipe';
import { RiscoPotencialBuilder } from './../../risco-potencial/risco-potencial.builder';
import { RiscoPotencialFilter } from './../../risco-potencial/risco-potencial.filter';
import { Triagem } from './../../../model/triagem';

@Component( {
    selector: 'app-ficha-coleta',
    templateUrl: './ficha-coleta.html',
    styleUrls: ['./ficha-coleta.css', './../../../../assets/css/form-component.css']
} )
export class FichaColetaComponent extends GenericFormComponent implements OnInit {
    private fichaColeta: FichaColeta;
    private gruposRespostasFichaColeta: Array<string>;
    private respostasFichaColetaByGrupo = [[]];
    private quantidadeItemRespostasByGrupo: Array<number>;
    private statusesSimNao: Array<string>;
    private nomeEmpregado: string;
    private listPathsEnumItem: Array<string>;
    private listEnumsByPathItem = [[]];

    constructor( private route: ActivatedRoute,
            private filaEsperaOcupacionalService: FilaEsperaOcupacionalService,
            router: Router) {
            super( filaEsperaOcupacionalService, router );
        
            this.goTo = "risco-potencial";
            
            this.fichaColeta = new FichaColetaBuilder().initialize(new FichaColeta());
            this.gruposRespostasFichaColeta = new Array<string>();
            this.quantidadeItemRespostasByGrupo = new Array<number>();
            this.listPathsEnumItem = new Array<string>();
    }

    ngOnInit() {
        let component = this;
        component.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    component.showPreload = true;

                    let filaFilter: FilaEsperaOcupacionalFilter = new FilaEsperaOcupacionalFilter();
                    filaFilter.setRiscoPotencial( new RiscoPotencialFilter() );
                    filaFilter.getRiscoPotencial().setId( id );
                    
                    component.filaEsperaOcupacionalService.listAll( filaFilter )
                        .then( res => {
                            component.showPreload = false;
                            component.nomeEmpregado = res.json().list[0]["empregado"]["pessoa"]["nome"];
                            component.fichaColeta = new FichaColetaBuilder().clone( res.json().list[0]["fichaColeta"] );
                            component.getRespostasFichaColeta();
                            component.getStatusSimNao();
                        } )
                        .catch( error => {
                            component.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    getStatusSimNao() {
        this.filaEsperaOcupacionalService.getStatusSimNao()
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

        this.fichaColeta.getRespostaFichaColetas().forEach( r => {
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
    
    contains( texto: string ) {
        let ret: string = "";
        if ( texto == undefined ) return;
        if ( texto.includes( "SIM" ) ) ret = "SIM";
        else if ( texto.includes( "ANAMNESE" ) ) ret = "ANAMNESE";
        else if ( texto.includes( "DOUBLE" ) ) ret = "DOUBLE";
        else if ( texto.includes( "INTEIRO" ) ) ret = "INTEIRO";
        else if ( texto.includes( "TEXTO" ) ) ret = "TEXTO";
        else if ( texto.includes( "EXAME F" ) ) ret = "EXAMEF";
        else if ( texto.includes( "EXAME ODONTOL" ) ) ret = "EXAMEODONTOL";
        else if ( texto.includes( "BITOS ALIMENTARES" ) ) ret = "BITOSALIMENTARES";
        else if ( texto.includes( "TESTE DE FAGERSTR" ) ) ret = "TESTEDEFAGERSTR";
        else if ( texto.includes( "VEL DE ESTRESSE" ) ) ret = "VELDEESTRESSE";
        return ret;
    }

    verifyRespostaSimNao( indexGrupo, indexRespostaByGrupo ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( this.fichaColeta.getRespostaFichaColetas()[indexResposta] != undefined &&
                this.fichaColeta.getRespostaFichaColetas()[indexResposta].getItens().length > 0 ) return true;
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
    
    getGridItensPergunta( itens: Array<ItemPerguntaFichaColeta> ) {
        let s: number = Math.floor( 12 / itens.length );
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
    
    verifyItemPath( resposta: RespostaFichaColeta, indexPath: number ) {
        if ( resposta.getPergunta().getItens()[indexPath] == undefined ) return;
        
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( path != undefined && path != '' )
            return true;
        
        return false;
    }
    
    getEnumsItem( resposta: RespostaFichaColeta, indexPath: number ) {
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( this.listPathsEnumItem.find(l => l == path) == undefined ) {   
            this.filaEsperaOcupacionalService.getEnums(path)
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
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
