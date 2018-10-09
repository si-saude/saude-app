import { EmpregadoConvocacao } from './empregado-convocacao';
import { Exame } from './exame';

import { CustomDate} from './../generics/utils/custom-date.util';

export class EmpregadoConvocacaoExame {
    private id: number;
    private empregadoConvocacao: EmpregadoConvocacao;
    private exame: Exame;
    private conforme: boolean;
    private exigeRelatorio: boolean;
    private realizacao: Date;
    private recebimento: Date;
    private auditoria: Date;
    private version: number;

    private realizacaoCustomDate: CustomDate = new CustomDate(this.realizacao);
    private recebimentoCustomDate: CustomDate = new CustomDate(this.recebimento);
    private auditoriaCustomDate: CustomDate = new CustomDate(this.auditoria);

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
    
    getExigeRelatorio() {
        return this.exigeRelatorio;
    }
    
    setExigeRelatorio(exigeRelatorio: boolean) {
        this.exigeRelatorio = exigeRelatorio;
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
    
    getRecebimento(){
        this.recebimento = this.recebimentoCustomDate.getApiDate();
        return this.recebimento;
    }
    
    setRecebimento(recebimento: Date){
        this.recebimentoCustomDate.setApiDate(recebimento);
        this.recebimento = recebimento;
    }
    
    getRecebimentoCustomDate(){
        return this.recebimentoCustomDate;
    }
    
    setRecebimentoCustomDate(recebimentoCustomDate: CustomDate){
        this.recebimentoCustomDate = recebimentoCustomDate;
    }
    
    getAuditoria(){
        this.auditoria = this.auditoriaCustomDate.getApiDate();
        return this.auditoria;
    }
    
    setAuditoria(auditoria: Date){
        this.auditoriaCustomDate.setApiDate(auditoria);
        this.auditoria = auditoria;
    }
    
    getAuditoriaCustomDate(){
        return this.auditoriaCustomDate;
    }
    
    setAuditoriaCustomDate(auditoriaCustomDate: CustomDate){
        this.auditoriaCustomDate = auditoriaCustomDate;
    }
}
