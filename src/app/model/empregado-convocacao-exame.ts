import { EmpregadoConvocacao } from './empregado-convocacao';
import { RelatorioMedico } from './relatorio-medico';
import { Exame } from './exame';

import { CustomDate} from './../generics/utils/custom-date.util';

export class EmpregadoConvocacaoExame {
    private id: number;
    private empregadoConvocacao: EmpregadoConvocacao;
    private exame: Exame;
    private conforme: boolean;
    private relatorioMedico: RelatorioMedico;
    private pendenteRelatorio: boolean;
    private version: number;
    private realizacao: Date;

    private realizacaoCustomDate: CustomDate = new CustomDate(this.realizacao);

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getEmpregadoConvocacao() {
        return this.empregadoConvocacao;
    }
    
    setEmpregadoConvocacao(empregadoConvocacao: EmpregadoConvocacao) {
        this.empregadoConvocacao = empregadoConvocacao;
    }
    
    getExame() {
        return this.exame;
    }
    
    setExame(exame: Exame) {
        this.exame = exame;
    }
    
    getConforme() {
        return this.conforme;
    }
    
    setConforme(conforme: boolean) {
        this.conforme = conforme;
    }
    
    getRelatorioMedico() {
        return this.relatorioMedico;
    }
    
    setRelatorioMedico(relatorioMedico: RelatorioMedico) {
        this.relatorioMedico = relatorioMedico;
    }
    
    getPendenteRelatorio() {
        return this.pendenteRelatorio;
    }
    
    setPendenteRelatorio(pendenteRelatorio: boolean) {
        this.pendenteRelatorio = pendenteRelatorio;
    }
     
    setVersion(version: number) {
        this.version = version;
    }
    
    getVersion() {
        return this.version;
    }
    
    getRealizacao(){
        this.realizacao = this.realizacaoCustomDate.getApiDate();
        return this.realizacao;
    }
    
    setRealizacao(realizacao: Date){
        this.realizacaoCustomDate.setApiDate(realizacao);
        this.realizacao = realizacao;
    }
    
    getRealizacaoCustomDate(){
        return this.realizacaoCustomDate;
    }
    
    setRealizacaoCustomDate(realizacaoCustomDate: CustomDate){
        this.realizacaoCustomDate = realizacaoCustomDate;
    }
}
