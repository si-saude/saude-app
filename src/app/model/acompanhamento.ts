import { Acao } from './acao';

export class Acompanhamento {
    private id: number;
    private descricao: string;
    private acao: Acao;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getAcao() {
        return this.acao;
    }

    setAcao(acao: Acao) {
        this.acao = acao;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
