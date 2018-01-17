import { Profissional } from './profissional';
import { Localizacao } from './localizacao';
import { FilaAtendimentoOcupacionalAtualizacao } from './fila-atendimento-ocupacional-atualizacao';

export class FilaAtendimentoOcupacional {
    private id: number;
    private profissional: Profissional;
    private localizacao: Localizacao;
    private inicio: Date;
    private atualizacao: Date;
    private fim: Date;
    private status: string;
    private atualizacoes: Array<FilaAtendimentoOcupacionalAtualizacao>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }

    getLocalizacao() {
        return this.localizacao;
    }

    setLocalizacao(localizacao: Localizacao) {
        this.localizacao = localizacao;
    }

    getInicio() {
        return this.inicio;
    }

    setInicio(inicio: Date) {
        this.inicio = inicio;
    }

    getAtualizacao() {
        return this.atualizacao;
    }

    setAtualizacao(atualizacao: Date) {
        this.atualizacao = atualizacao;
    }

    getFim() {
        return this.fim;
    }

    setFim(fim: Date) {
        this.fim = fim;
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

    getAtualizacoes() {
        return this.atualizacoes;
    }

    setAtualizacoes(atualizacoes: Array<FilaAtendimentoOcupacionalAtualizacao>) {
        this.atualizacoes = atualizacoes;
    }
    
}
