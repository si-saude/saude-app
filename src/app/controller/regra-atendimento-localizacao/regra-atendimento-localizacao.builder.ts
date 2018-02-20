import { Localizacao } from './../../model/localizacao';
import { LocalizacaoBuilder } from './../localizacao/localizacao.builder';
import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoBuilder } from './../regra-atendimento/regra-atendimento.builder';
import { Servico } from './../../model/servico';
import { ServicoBuilder } from './../servico/servico.builder';
import { RegraAtendimentoLocalizacao } from './../../model/regra-atendimento-localizacao';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GenericBuilder } from './../../generics/generic.builder';

export class RegraAtendimentoLocalizacaoBuilder extends GenericBuilder{
    
    initialize(regraAtendimentoLocalizacao: RegraAtendimentoLocalizacao): RegraAtendimentoLocalizacao {
        regraAtendimentoLocalizacao = new RegraAtendimentoLocalizacao();
        
        regraAtendimentoLocalizacao.setLocalizacao(new Localizacao())
        regraAtendimentoLocalizacao.setRegraAtendimento(new RegraAtendimentoBuilder().initialize(new RegraAtendimento()));
        regraAtendimentoLocalizacao.setServicos(new ServicoBuilder().initializeList(new Array<Servico>()));
        
        return regraAtendimentoLocalizacao;
    }
    
    initializeList(regraAtendimentoLocalizacoes: Array<RegraAtendimentoLocalizacao>) {
        
        let array: Array<RegraAtendimentoLocalizacao> = new Array<RegraAtendimentoLocalizacao>();
        
        if(regraAtendimentoLocalizacoes === null || regraAtendimentoLocalizacoes === undefined)
            regraAtendimentoLocalizacoes = new Array<RegraAtendimentoLocalizacao>();
        
        for (let regraAtendimentoLocalizacao of regraAtendimentoLocalizacoes) {
            array.push(this.initialize(regraAtendimentoLocalizacao));
        }
        
        return array;
    }
    
    
    clone(regraAtendimentoLocalizacao: RegraAtendimentoLocalizacao): RegraAtendimentoLocalizacao {        
        let cloneRegraAtendimentoLocalizacao = new RegraAtendimentoLocalizacao();
        
        if (regraAtendimentoLocalizacao === null || regraAtendimentoLocalizacao === undefined)
            regraAtendimentoLocalizacao = new RegraAtendimentoLocalizacao();
        
        cloneRegraAtendimentoLocalizacao.setId(this.getValue(regraAtendimentoLocalizacao, "getId"));
        cloneRegraAtendimentoLocalizacao.setVersion(this.getValue(regraAtendimentoLocalizacao, "getVersion"));
        
        if (this.getValue(regraAtendimentoLocalizacao, "getRegraAtendimento") !== undefined) { 
            cloneRegraAtendimentoLocalizacao.setRegraAtendimento(
                    new RegraAtendimentoBuilder().clone(this.getValue(regraAtendimentoLocalizacao,"getRegraAtendimento")));
            if(!this.idGtZero(cloneRegraAtendimentoLocalizacao.getRegraAtendimento()))
                cloneRegraAtendimentoLocalizacao.setRegraAtendimento(undefined);
        } else {
            cloneRegraAtendimentoLocalizacao.setRegraAtendimento(new RegraAtendimentoBuilder().initialize(null));
        }
        
        cloneRegraAtendimentoLocalizacao.setServicos(
                new ServicoBuilder().cloneList(this.getValue(regraAtendimentoLocalizacao,"getServicos")));
        
        cloneRegraAtendimentoLocalizacao.setLocalizacao(new Localizacao());
                
        return cloneRegraAtendimentoLocalizacao;
    } 
    
    cloneList(regraAtendimentoLocalizacoes: Array<RegraAtendimentoLocalizacao>): Array<RegraAtendimentoLocalizacao>{
        let array:Array<RegraAtendimentoLocalizacao> = new Array<RegraAtendimentoLocalizacao>();
    
        if (regraAtendimentoLocalizacoes !== null && regraAtendimentoLocalizacoes !== undefined) {
            for (let regraAtendimentoLocalizacao of regraAtendimentoLocalizacoes) {
                array.push(this.clone(regraAtendimentoLocalizacao));
            }
        }
    
        return array;
    }
    
}