import { TipoSolicitacao } from './../../model/tipo-solicitacao';
import { GenericBuilder } from './../../generics/generic.builder';

export class TipoSolicitacaoBuilder extends GenericBuilder {

    initialize(tipoSolicitacao: TipoSolicitacao) {
        tipoSolicitacao = new TipoSolicitacao();
        return tipoSolicitacao;
    }
    
    initializeList(tipoSolicitacoes: Array<TipoSolicitacao>) {
        
        let array:Array<TipoSolicitacao> = new Array<TipoSolicitacao>();
        
        if(tipoSolicitacoes === null || tipoSolicitacoes === undefined)
            tipoSolicitacoes = new Array<TipoSolicitacao>();
        
        for (let tipoSolicitacao of tipoSolicitacoes) {
            array.push(this.initialize(tipoSolicitacao));
        }
        
        return array;
    }
    
    clone(tipoSolicitacao: TipoSolicitacao): TipoSolicitacao {
        
        if (tipoSolicitacao === null || tipoSolicitacao === undefined)
            tipoSolicitacao = new TipoSolicitacao();
        
        let cloneTipoSolicitacao = new TipoSolicitacao();
        cloneTipoSolicitacao.setId(this.getValue(tipoSolicitacao,"getId"));
        cloneTipoSolicitacao.setNome(this.getValue(tipoSolicitacao, "getNome"));
        cloneTipoSolicitacao.setVersion(this.getValue(tipoSolicitacao, "getVersion"));
        return cloneTipoSolicitacao;
    }
    
    cloneList(tipoSolicitacoes: Array<TipoSolicitacao>): Array<TipoSolicitacao> {
        let array:Array<TipoSolicitacao> = new Array<TipoSolicitacao>();
    
        if (tipoSolicitacoes !== null && tipoSolicitacoes !== undefined) {    
            for (let tipoSolicitacao of tipoSolicitacoes) {
                array.push(this.clone(tipoSolicitacao));
            }
        }
        
        return array;
    }
}