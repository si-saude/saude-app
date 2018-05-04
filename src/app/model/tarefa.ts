import { Servico } from './servico';
import { Empregado } from './empregado';
import { Profissional } from './profissional';
import { Equipe } from './equipe';

export class Tarefa {
    private id: number;
    private inicio: Date;
    private fim: Date;
    private atualizacao: Date;
    private servico: Servico;
    private cliente: Empregado;
    private responsavel: Profissional;
    private equipe: Equipe;
    private status: string;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getAtualizacao() {
        return this.atualizacao;
    }

    setAtualizacao(atualizacao: Date) {
        this.atualizacao = atualizacao;
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

    getServico() {
        return this.servico;
    }

    setServico(servico: Servico) {
        this.servico = servico;
    }

    getCliente() {
        return this.cliente;
    }

    setCliente(cliente: Empregado) {
        this.cliente = cliente;
    }

    getResponsavel() {
        return this.responsavel;
    }

    setResponsavel(responsavel: Profissional) {
        this.responsavel = responsavel;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
