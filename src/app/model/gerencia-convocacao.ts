import { Gerencia } from './gerencia';
import { Convocacao } from './convocacao';

export class GerenciaConvocacao {
    private id: number;
    private gerencia: Gerencia;
    private convocacao: Convocacao;
    private inicio: Date;
    private fim: Date;
    private selecionado: boolean;
    private version: number;
    
    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getGerencia() {
        return this.gerencia;
    }
    
    setGerencia(gerencia: Gerencia) {
        this.gerencia = gerencia;
    }
    
    getConvocacao() {
        return this.convocacao;
    }
    
    setConvocacao(convocacao: Convocacao) {
        this.convocacao = convocacao;
    }
    
    getInicio() {
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicio = inicio;
    }
    
    getFim() {
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fim = fim;
    }
    
    getSelecionado() {
        return this.selecionado;
    }
    
    setSelecionado(selecionado: boolean) {
        this.selecionado = selecionado;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}
