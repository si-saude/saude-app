import { Gerencia } from './../../model/gerencia';
import { Convocacao } from './../../model/convocacao';
import { GerenciaConvocacao } from './../../model/gerencia-convocacao';
import { GerenciaBuilder } from './../gerencia/gerencia.builder';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GerenciaConvocacaoBuilder extends GenericBuilder{
    
    initialize(gerenciaConvocacao: GerenciaConvocacao): GerenciaConvocacao {
        gerenciaConvocacao = new GerenciaConvocacao();
        
        gerenciaConvocacao.setGerencia(new GerenciaBuilder().initialize(gerenciaConvocacao.getGerencia()));
        gerenciaConvocacao.setConvocacao(new Convocacao());
        
        return gerenciaConvocacao;
    }
    
    initializeList(gerenciasConvocacao: Array<GerenciaConvocacao>) {
        
        let array:Array<GerenciaConvocacao> = new Array<GerenciaConvocacao>();
        
        if(gerenciasConvocacao === null || gerenciasConvocacao === undefined)
            gerenciasConvocacao = new Array<GerenciaConvocacao>();
        
        for (let gerenciaConvocacao of gerenciasConvocacao) {
            array.push(this.initialize(gerenciaConvocacao));
        }
        
        return array;
    }
    
    clone(gerenciaConvocacao: GerenciaConvocacao): GerenciaConvocacao {
        let cloneGerenciaConvocacao = new GerenciaConvocacao();
        
        if (gerenciaConvocacao === null || gerenciaConvocacao === undefined)
            gerenciaConvocacao = new GerenciaConvocacao();
        
        cloneGerenciaConvocacao.setId(this.getValue(gerenciaConvocacao, "getId"));
        cloneGerenciaConvocacao.setVersion(this.getValue(gerenciaConvocacao, "getVersion"));
        cloneGerenciaConvocacao.setInicio(this.getValue(gerenciaConvocacao, "getInicio"));
        cloneGerenciaConvocacao.setFim(this.getValue(gerenciaConvocacao, "getFim"));
        cloneGerenciaConvocacao.setSelecionado(this.getValue(gerenciaConvocacao, "getSelecionado"));
        
        cloneGerenciaConvocacao.setConvocacao(new Convocacao());
        
        cloneGerenciaConvocacao.setGerencia(new GerenciaBuilder().clone(this.getValue(gerenciaConvocacao, "getGerencia")));
        
        return cloneGerenciaConvocacao;
    }
    
    cloneList(gerenciasConvocacao: Array<GerenciaConvocacao>): Array<GerenciaConvocacao> {
        let array:Array<GerenciaConvocacao> = new Array<GerenciaConvocacao>();
    
        if (gerenciasConvocacao !== null && gerenciasConvocacao !== undefined) { 
            for (let gerenciaConvocacao of gerenciasConvocacao) {
                array.push(this.clone(gerenciaConvocacao));
            }
        }
        
        return array;
    }
}