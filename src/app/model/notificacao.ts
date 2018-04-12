import { Equipe } from './equipe';

export class Notificacao {
    private id: number;
    private equipe: Equipe;
    private descricao: string;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
