import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';
import { Tarefa } from './../../model/tarefa';
import { TipoSolicitacao } from './../../model/tipo-solicitacao';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { TipoSolicitacaoBuilder } from './../tipo-solicitacao/tipo-solicitacao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class SolicitacaoCentralIntegraBuilder extends GenericBuilder {
    
    initialize(solicitacao: SolicitacaoCentralIntegra) {
        solicitacao = new SolicitacaoCentralIntegra();
        
        solicitacao.setTarefa(new TarefaBuilder().initialize(new Tarefa()))
        solicitacao.setTipoSolicitacao(new TipoSolicitacaoBuilder().initialize(new TipoSolicitacao()))
        
        return solicitacao;
    }
    
    initializeList(solicitacoes: Array<SolicitacaoCentralIntegra>) {
        
        let array:Array<SolicitacaoCentralIntegra> = new Array<SolicitacaoCentralIntegra>();
        
        if(solicitacoes === null || solicitacoes === undefined)
            solicitacoes = new Array<SolicitacaoCentralIntegra>();
        
        for (let solicitacao of solicitacoes) {
            array.push(this.initialize(solicitacao));
        }
        
        return array;
    }
    
    clone(solicitacao: SolicitacaoCentralIntegra): SolicitacaoCentralIntegra {
        
        if (solicitacao === null || solicitacao === undefined)
            solicitacao = new SolicitacaoCentralIntegra();
        
        let cloneSolicitacao = new SolicitacaoCentralIntegra();
        cloneSolicitacao.setId(this.getValue(solicitacao,"getId"));
        cloneSolicitacao.setVersion(this.getValue(solicitacao,"getVersion"));
        cloneSolicitacao.setAbertura(this.getValue(solicitacao,"getAbertura"));
        cloneSolicitacao.setAnexoBase64(this.getValue(solicitacao,"getAnexoBase64"));
        cloneSolicitacao.setConcluido(this.getValue(solicitacao,"getConcluido"));
        cloneSolicitacao.setDescricao(this.getValue(solicitacao,"getDescricao"));
        cloneSolicitacao.setObservacao(this.getValue(solicitacao,"getObservacao"));
        cloneSolicitacao.setPrazo(this.getValue(solicitacao,"getPrazo"));
        cloneSolicitacao.setStatus(this.getValue(solicitacao,"getStatus"));
        cloneSolicitacao.setTempoEstimado(this.getValue(solicitacao,"getTempoEstimado"));
        cloneSolicitacao.setTempoGasto(this.getValue(solicitacao,"getTempoGasto"));
        cloneSolicitacao.setAtrasado(this.getValue(solicitacao,"getAtrasado"));
        
        cloneSolicitacao.setTarefa(
                new TarefaBuilder().clone(this.getValue(solicitacao,"getTarefa")));
        
        cloneSolicitacao.setTipoSolicitacao(
                new TipoSolicitacaoBuilder().clone(this.getValue(solicitacao,"getTipoSolicitacao")));
        
        return cloneSolicitacao;
    }
    
    cloneList(solicitacoes: Array<SolicitacaoCentralIntegra>): Array<SolicitacaoCentralIntegra> {
        let array:Array<SolicitacaoCentralIntegra> = new Array<SolicitacaoCentralIntegra>();
    
        if (solicitacoes !== null && solicitacoes !== undefined) {    
            for (let solicitacao of solicitacoes) {
                array.push(this.clone(solicitacao));
            }
        }
        
        return array;
    }
    
}