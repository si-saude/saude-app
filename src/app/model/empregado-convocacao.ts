import { Empregado } from './empregado';
import { Convocacao } from './convocacao';
import { EmpregadoConvocacaoExame } from './empregado-convocacao-exame';
import { ResultadoExame } from './resultado-exame';
import { CustomDate } from './../generics/utils/custom-date.util';

export class EmpregadoConvocacao {
    private id: number;
    private empregado: Empregado;
    private convocacao: Convocacao;
    private empregadoConvocacaoExames: Array<EmpregadoConvocacaoExame>;
    private resultadoExames: Array<ResultadoExame>;
    private auditado: boolean;
    private resultadoAuditado: boolean;
    private convocado: boolean;
    private selecionado: boolean;
    private divergente: boolean;
    private auditadoSd2000: boolean;
    private dataConvocacao: Date;
    private version: number;

    private dataConvocacaoCustomDate: CustomDate = new CustomDate(this.dataConvocacao);

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }
    
    getConvocacao() {
        return this.convocacao;
    }
    
    setConvocacao(convocacao: Convocacao) {
        this.convocacao = convocacao;
    }
    
    getEmpregadoConvocacaoExames() {
        return this.empregadoConvocacaoExames;
    }
    
    setEmpregadoConvocacaoExames(empregadoConvocacaoExames: Array<EmpregadoConvocacaoExame>) {
        this.empregadoConvocacaoExames = empregadoConvocacaoExames;
    }
    
    getResultadoExames() {
        return this.resultadoExames;
    }
    
    setResultadoExames(resultadoExames: Array<ResultadoExame>) {
        this.resultadoExames = resultadoExames;
    }
    
    getAuditado() {
        return this.auditado;
    }
    
    setAuditado(auditado: boolean) {
        this.auditado = auditado;
    }
    
    getAuditadoSd2000() {
        return this.auditadoSd2000;
    }
    
    setAuditadoSd2000(auditadoSd2000: boolean) {
        this.auditadoSd2000 = auditadoSd2000;
    }
    
    getResultadoAuditado() {
        return this.resultadoAuditado;
    }
    
    setResultadoAuditado(resultadoAuditado: boolean) {
        this.resultadoAuditado = resultadoAuditado;
    }
    
    getConvocado() {
        return this.convocado;
    }
    
    setConvocado(convocado: boolean) {
        this.convocado = convocado;
    }
    
    getSelecionado() {
        return this.selecionado;
    }
    
    setSelecionado(selecionado: boolean) {
        this.selecionado = selecionado;
    }
    
    getDivergente() {
        return this.divergente;
    }
    
    setDivergente(divergente: boolean) {
        this.divergente = divergente;
    }
    
    getDataConvocacao() {
        this.dataConvocacao = this.dataConvocacaoCustomDate.getApiDate();
        return this.dataConvocacao;
    }
    
    setDataConvocacao(dataConvocacao: Date) {
        this.dataConvocacaoCustomDate.setApiDate(dataConvocacao);
        this.dataConvocacao = dataConvocacao;
    }
    
    getDataConvocacaoCustomDate(){
        return this.dataConvocacaoCustomDate;
    }
    
    setDataConvocacaoCustomDate(dataConvocacaoCustomDate: CustomDate){
        this.dataConvocacaoCustomDate = dataConvocacaoCustomDate;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}