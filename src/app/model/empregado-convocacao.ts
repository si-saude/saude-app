import { Empregado } from './empregado';
import { Convocacao } from './convocacao';
import { EmpregadoConvocacaoExame } from './empregado-convocacao-exame';

export class EmpregadoConvocacao {
    private id: number;
    private empregado: Empregado;
    private convocacao: Convocacao;
    private empregadoConvocacaoExames: Array<EmpregadoConvocacaoExame>;
    private auditado: boolean;
    private convocado: boolean;
    private selecionado: boolean;
    private divergente: boolean;
    private version: number;
    
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
    
    getAuditado() {
        return this.auditado;
    }
    
    setAuditado(auditado: boolean) {
        this.auditado = auditado;
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
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}