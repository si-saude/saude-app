import { FilaAtendimentoOcupacionalAtualizacao } from './../../model/fila-atendimento-ocupacional-atualizacao';
import { FilaAtendimentoOcupacional } from './../../model/fila-atendimento-ocupacional';
import { FilaAtendimentoOcupacionalBuilder } from './../fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class FilaAtendimentoOcupacionalAtualizacaoBuilder extends GenericBuilder {
    
    initialize(filaAtendimentoOcupacionalAtualizacao: FilaAtendimentoOcupacionalAtualizacao) {
        filaAtendimentoOcupacionalAtualizacao = new FilaAtendimentoOcupacionalAtualizacao();
        
        filaAtendimentoOcupacionalAtualizacao.setFila(
                new FilaAtendimentoOcupacionalBuilder().initialize(new FilaAtendimentoOcupacional()));
        
        return filaAtendimentoOcupacionalAtualizacao;
    }
    
    initializeList(filaAtendimentoOcupacionalAtualizacoes: Array<FilaAtendimentoOcupacionalAtualizacao>) {
        
        let array:Array<FilaAtendimentoOcupacionalAtualizacao> = new Array<FilaAtendimentoOcupacionalAtualizacao>();
        
        if(filaAtendimentoOcupacionalAtualizacoes === null || filaAtendimentoOcupacionalAtualizacoes === undefined)
            filaAtendimentoOcupacionalAtualizacoes = new Array<FilaAtendimentoOcupacionalAtualizacao>();
        
        for (let filaAtendimentoOcupacionalAtualizacao of filaAtendimentoOcupacionalAtualizacoes) {
            array.push(this.initialize(filaAtendimentoOcupacionalAtualizacao));
        }
        
        return array;
    }
    
    clone(filaAtendimentoOcupacionalAtualizacao: FilaAtendimentoOcupacionalAtualizacao): FilaAtendimentoOcupacionalAtualizacao {
        
        if (filaAtendimentoOcupacionalAtualizacao === null || filaAtendimentoOcupacionalAtualizacao === undefined)
            filaAtendimentoOcupacionalAtualizacao = new FilaAtendimentoOcupacionalAtualizacao();
        
        let cloneFilaAtendimentoOcupacionalAtualizacao = new FilaAtendimentoOcupacionalAtualizacao();
        cloneFilaAtendimentoOcupacionalAtualizacao.setId(this.getValue(filaAtendimentoOcupacionalAtualizacao,"getId"));
        cloneFilaAtendimentoOcupacionalAtualizacao.setVersion(this.getValue(filaAtendimentoOcupacionalAtualizacao,"getVersion"));
        cloneFilaAtendimentoOcupacionalAtualizacao.setTempo(this.getValue(filaAtendimentoOcupacionalAtualizacao,"getTempo"));
        
        cloneFilaAtendimentoOcupacionalAtualizacao.setFila(new FilaAtendimentoOcupacional());
        
        if(this.getValue(filaAtendimentoOcupacionalAtualizacao, "getStatus") == "")
            cloneFilaAtendimentoOcupacionalAtualizacao.setStatus(undefined);
        else if (this.getValue(filaAtendimentoOcupacionalAtualizacao, "getStatus") == undefined )
            cloneFilaAtendimentoOcupacionalAtualizacao.setStatus("");
        else
            cloneFilaAtendimentoOcupacionalAtualizacao.setStatus(this.getValue(filaAtendimentoOcupacionalAtualizacao, "getStatus"));
        
        return cloneFilaAtendimentoOcupacionalAtualizacao;
    }
    
    cloneList(filaAtendimentoOcupacionalAtualizacaos: Array<FilaAtendimentoOcupacionalAtualizacao>): Array<FilaAtendimentoOcupacionalAtualizacao> {
        let array:Array<FilaAtendimentoOcupacionalAtualizacao> = new Array<FilaAtendimentoOcupacionalAtualizacao>();
    
        if (filaAtendimentoOcupacionalAtualizacaos !== null && filaAtendimentoOcupacionalAtualizacaos !== undefined) { 
            for (let filaAtendimentoOcupacionalAtualizacao of filaAtendimentoOcupacionalAtualizacaos) {
                array.push(this.clone(filaAtendimentoOcupacionalAtualizacao));
            }
        }
        
        return array;
    }
    
}