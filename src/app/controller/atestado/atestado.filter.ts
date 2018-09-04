import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { MotivoRecusaAtestadoFilter } from './../motivo-recusa-atestado/motivo-recusa-atestado.filter';

export class AtestadoFilter extends GenericFilter {
    private atestadoFisicoRecebido: BooleanFilter;
    private controleLicenca: BooleanFilter;
    private impossibilidadeLocomocao: BooleanFilter;
    private lancadoSap: BooleanFilter;
    private aposentadoInss: BooleanFilter;
    private presencial: BooleanFilter;
    private possuiFeriasAgendadas: BooleanFilter;
    private ciente: BooleanFilter;
    private empregado: EmpregadoFilter;
    private motivoRecusa: MotivoRecusaAtestadoFilter;
    
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
}