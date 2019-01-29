import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { MotivoRecusaAtestadoFilter } from './../motivo-recusa-atestado/motivo-recusa-atestado.filter';
import { DateFilter } from './../../generics/date.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';

export class AtestadoFilter extends GenericFilter {
    private atestadoFisicoRecebido: BooleanFilter;
    private controleLicenca: BooleanFilter;
    private impossibilidadeLocomocao: BooleanFilter;
    private lancadoSap: BooleanFilter;
    private aposentadoInss: BooleanFilter;
    private presencial: BooleanFilter;
    private possuiFeriasAgendadas: BooleanFilter;
    private ciente: BooleanFilter;
    private empregado: EmpregadoFilter = new EmpregadoFilter();
    private motivoRecusa: MotivoRecusaAtestadoFilter;
    private dataAuditoria: DateFilter;
    private convocado: BooleanFilter;
    private dataHomologacao: DateFilter;
    
    public getAtestadoFisicoRecebido() {
        return this.atestadoFisicoRecebido;
    }
    public setAtestadoFisicoRecebido(atestadoFisicoRecebido) {
        this.atestadoFisicoRecebido = atestadoFisicoRecebido;
    }
    public getControleLicenca() {
        return this.controleLicenca;
    }
    public setControleLicenca(controleLicenca) {
        this.controleLicenca = controleLicenca;
    }
    public getImpossibilidadeLocomocao() {
        return this.impossibilidadeLocomocao;
    }
    public setImpossibilidadeLocomocao(impossibilidadeLocomocao) {
        this.impossibilidadeLocomocao = impossibilidadeLocomocao;
    }
    public getLancadoSap() {
        return this.lancadoSap;
    }
    public setLancadoSap(lancadoSap) {
        this.lancadoSap = lancadoSap;
    }
    public getAposentadoInss() {
        return this.aposentadoInss;
    }
    public setAposentadoInss(aposentadoInss) {
        this.aposentadoInss = aposentadoInss;
    }
    public getPresencial() {
        return this.presencial;
    }
    public setPresencial(presencial) {
        this.presencial = presencial;
    }
    public getPossuiFeriasAgendadas() {
        return this.possuiFeriasAgendadas;
    }
    public setPossuiFeriasAgendadas(possuiFeriasAgendadas) {
        this.possuiFeriasAgendadas = possuiFeriasAgendadas;
    }
    public getCiente() {
        return this.ciente;
    }
    public setCiente(ciente) {
        this.ciente = ciente;
    }
    public getEmpregado() {
        return this.empregado;
    }
    public setEmpregado(empregado) {
        this.empregado = empregado;
    }
    public getMotivoRecusa() {
        return this.motivoRecusa;
    }
    public setMotivoRecusa(motivoRecusa) {
        this.motivoRecusa = motivoRecusa;
    }
    public getDataAuditoria() {
        return this.dataAuditoria;
    }
    public setDataAuditoria(dataAuditoria: DateFilter) {
        this.dataAuditoria = dataAuditoria;
    }
    public getConvocado() {
        return this.convocado;
    }
    public setConvocado(convocado) {
        this.convocado = convocado;
    }
    public getDataHomologacao() {
        return this.dataHomologacao;
    }
    public setDataHomologacao(dataHomologacao: DateFilter) {
        this.dataHomologacao = dataHomologacao;
    }
}