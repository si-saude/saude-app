import { Convocacao } from './../../model/convocacao';
import { EmpregadoConvocacaoBuilder } from './../empregado-convocacao/empregado-convocacao.builder';
import { GerenciaConvocacaoBuilder } from './../gerencia-convocacao/gerencia-convocacao.builder';
import { ProfissiogramaBuilder } from './../profissiograma/profissiograma.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ConvocacaoBuilder extends GenericBuilder {
    
    initialize(convocacao: Convocacao) {
        convocacao = new Convocacao();
        
        convocacao.setEmpregadoConvocacoes(new EmpregadoConvocacaoBuilder().initializeList(convocacao.getEmpregadoConvocacoes()));
        convocacao.setGerenciaConvocacoes(new GerenciaConvocacaoBuilder().initializeList(convocacao.getGerenciaConvocacoes()));
        convocacao.setProfissiograma(new ProfissiogramaBuilder().initialize(convocacao.getProfissiograma()));
        
        return convocacao;
    }
    
    initializeList(convocacaos: Array<Convocacao>) {
        
        let array:Array<Convocacao> = new Array<Convocacao>();
        
        if(convocacaos === null || convocacaos === undefined)
            convocacaos = new Array<Convocacao>();
        
        for (let convocacao of convocacaos) {
            array.push(this.initialize(convocacao));
        }
        
        return array;
    }
    
    clone(convocacao: Convocacao) {
        let cloneConvocacao = new Convocacao();
        
        if (convocacao === null || convocacao === undefined)
            convocacao = new Convocacao();
        
        if(this.getValue(convocacao, "getTipo") == "")
            cloneConvocacao.setTipo(undefined);
        else if (this.getValue(convocacao, "getTipo") == undefined)
            cloneConvocacao.setTipo("");
        else
            cloneConvocacao.setTipo(this.getValue(convocacao, "getTipo"));
        
        cloneConvocacao.setId(this.getValue(convocacao,"getId"));
        cloneConvocacao.setInicio(this.getValue(convocacao, "getInicio"));
        cloneConvocacao.setFim(this.getValue(convocacao, "getFim"));
        cloneConvocacao.setVersion(this.getValue(convocacao,"getVersion"));
        cloneConvocacao.setTitulo(this.getValue(convocacao,"getTitulo"));
        
        cloneConvocacao.setEmpregadoConvocacoes(
                new EmpregadoConvocacaoBuilder().cloneList(this.getValue(convocacao, "getEmpregadoConvocacoes")));
        
        cloneConvocacao.setGerenciaConvocacoes(
                new GerenciaConvocacaoBuilder().cloneList(this.getValue(convocacao, "getGerenciaConvocacoes")));
        
        cloneConvocacao.setProfissiograma(
                new ProfissiogramaBuilder().clone(this.getValue(convocacao, "getProfissiograma")));

        return cloneConvocacao;
    }
    
    cloneList(convocacaos: Array<Convocacao>): Array<Convocacao> {
        let array:Array<Convocacao> = new Array<Convocacao>();
        if (convocacaos !== null && convocacaos !== undefined) { 
            for (let convocacao of convocacaos) {
                array.push(this.clone(convocacao));
            }
        }
        
        return array;
    }
}