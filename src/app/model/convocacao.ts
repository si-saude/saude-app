import { Profissiograma } from './profissiograma';
import { GerenciaConvocacao } from './gerencia-convocacao';
import { EmpregadoConvocacao } from './empregado-convocacao';

export class Convocacao {
    private id: number;
    private titulo: string;
    private tipo: string = "";
    private profissiograma: Profissiograma;
    private gerenciaConvocacoes: Array<GerenciaConvocacao>;
    private empregadoConvocacoes: Array<EmpregadoConvocacao>;
    private inicio: Date;
    private fim: Date;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }
    
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    
    getTipo() {
        return this.tipo;
    }
    
    setTipo(tipo: string) {
        this.tipo = tipo;
    }
    
    getProfissiograma() {
        return this.profissiograma;
    }
    
    setProfissiograma(profissiograma: Profissiograma) {
        this.profissiograma = profissiograma;
    }
    
    getGerenciaConvocacoes() {
        return this.gerenciaConvocacoes;
    }
    
    setGerenciaConvocacoes(gerenciaConvocacoes: Array<GerenciaConvocacao>) {
        this.gerenciaConvocacoes = gerenciaConvocacoes;
    }
    
    getEmpregadoConvocacoes() {
        return this.empregadoConvocacoes;
    }
    
    setEmpregadoConvocacoes(empregadoConvocacoes: Array<EmpregadoConvocacao>) {
        this.empregadoConvocacoes = empregadoConvocacoes;
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
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}
