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
}