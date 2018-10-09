import { TipoGrupoMonitoramento } from './tipo-grupo-monitoramento';
import { Empregado } from './empregado';
import { Avaliacao } from './avaliacao';

export class GrupoMonitoramento {
    
    private id: number;
    private nome: string;
    private tipoGrupoMonitoramento: TipoGrupoMonitoramento;
    private empregados: Array<Empregado>;
    private avaliacoes: Array<Avaliacao>;
    private recorrente: boolean;
    private relatorio: boolean;
    private auditoriaAso: boolean;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getNome() {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getTipoGrupoMonitoramento() {
        return this.tipoGrupoMonitoramento;
    }
    
    setTipoGrupoMonitoramento(tipoGrupoMonitoramento: TipoGrupoMonitoramento) {
        this.tipoGrupoMonitoramento = tipoGrupoMonitoramento;
    }
    
    getEmpregados() {
        return this.empregados;
    }
    
    setEmpregados(empregados: Array<Empregado>) {
        this.empregados = empregados;
    }
    
    getAvaliacoes() {
        return this.avaliacoes;
    }
    
    setAvaliacoes(avaliacoes: Array<Avaliacao>) {
        this.avaliacoes = avaliacoes;
    }
    
    getRecorrente() {
        return this.recorrente;
    }
    
    setRecorrente(recorrente: boolean) {
        this.recorrente = recorrente;
    }
    
    getRelatorio() {
        return this.relatorio;
    }
    
    setRelatorio(relatorio: boolean) {
        this.relatorio = relatorio;
    }
    
    getAuditoriaAso():boolean{
        return this.auditoriaAso;
    }
    
    setAuditoriaAso(auditoriaAso:boolean){
        this.auditoriaAso = auditoriaAso;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}