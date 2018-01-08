import { Empregado } from './../../model/empregado';
import { Convocacao } from './../../model/convocacao';
import { ConvocacaoBuilder } from './../convocacao/convocacao.builder';
import { ResultadoExameBuilder } from './../resultado-exame/resultado-exame.builder';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { EmpregadoConvocacaoExameBuilder } from './../empregado-convocacao-exame/empregado-convocacao-exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class EmpregadoConvocacaoBuilder extends GenericBuilder{
    
    initialize(empregadoConvocacao: EmpregadoConvocacao): EmpregadoConvocacao {
        empregadoConvocacao = new EmpregadoConvocacao();
        
        empregadoConvocacao.setEmpregado(new EmpregadoBuilder().initialize(empregadoConvocacao.getEmpregado()));
        empregadoConvocacao.setEmpregadoConvocacaoExames(
                new EmpregadoConvocacaoExameBuilder().initializeList(empregadoConvocacao.getEmpregadoConvocacaoExames()));
        empregadoConvocacao.setConvocacao(new Convocacao());
        empregadoConvocacao.setResultadoExames(new ResultadoExameBuilder().initializeList(empregadoConvocacao.getResultadoExames()));
        
        return empregadoConvocacao;
    }
    
    initializeList(empregadosConvocacao: Array<EmpregadoConvocacao>) {
        
        let array:Array<EmpregadoConvocacao> = new Array<EmpregadoConvocacao>();
        
        if(empregadosConvocacao === null || empregadosConvocacao === undefined)
            empregadosConvocacao = new Array<EmpregadoConvocacao>();
        
        for (let empregadoConvocacao of empregadosConvocacao) {
            array.push(this.initialize(empregadoConvocacao));
        }
        
        return array;
    }
    
    clone(empregadoConvocacao: EmpregadoConvocacao): EmpregadoConvocacao {
        let cloneEmpregadoConvocacao = new EmpregadoConvocacao();
        
        if (empregadoConvocacao === null || empregadoConvocacao === undefined)
            empregadoConvocacao = new EmpregadoConvocacao();
        
        cloneEmpregadoConvocacao.setId(this.getValue(empregadoConvocacao, "getId"));
        cloneEmpregadoConvocacao.setVersion(this.getValue(empregadoConvocacao, "getVersion"));
        cloneEmpregadoConvocacao.setAuditado(this.getValue(empregadoConvocacao, "getAuditado"));
        cloneEmpregadoConvocacao.setResultadoAuditado(this.getValue(empregadoConvocacao, "getResultadoAuditado"));
        cloneEmpregadoConvocacao.setConvocado(this.getValue(empregadoConvocacao, "getConvocado"));
        cloneEmpregadoConvocacao.setDivergente(this.getValue(empregadoConvocacao, "getDivergente"));
        cloneEmpregadoConvocacao.setSelecionado(this.getValue(empregadoConvocacao, "getSelecionado"));
        
        cloneEmpregadoConvocacao.setConvocacao(new ConvocacaoBuilder().clone(this.getValue(empregadoConvocacao, "getConvocacao")));
        
        cloneEmpregadoConvocacao.setEmpregado(new EmpregadoBuilder().clone(this.getValue(empregadoConvocacao, "getEmpregado")));
        
        cloneEmpregadoConvocacao.setEmpregadoConvocacaoExames(
                    new EmpregadoConvocacaoExameBuilder().cloneList(this.getValue(empregadoConvocacao,"getEmpregadoConvocacaoExames")));
        
        cloneEmpregadoConvocacao.setResultadoExames(
                new ResultadoExameBuilder().cloneList(this.getValue(empregadoConvocacao, "getResultadoExames")));

        return cloneEmpregadoConvocacao;
    }
    
    cloneList(empregadosConvocacao: Array<EmpregadoConvocacao>): Array<EmpregadoConvocacao> {
        let array:Array<EmpregadoConvocacao> = new Array<EmpregadoConvocacao>();
    
        if (empregadosConvocacao !== null && empregadosConvocacao !== undefined) { 
            for (let empregadoConvocacao of empregadosConvocacao) {
                array.push(this.clone(empregadoConvocacao));
            }
        }
        
        return array;
    }
}