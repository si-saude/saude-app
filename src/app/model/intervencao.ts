import { Equipe } from './equipe';

export class Intervencao {
    private id: number;
    private equipe: Equipe;
    private descricao: string;
    private inativo: boolean;
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

    isInativo() {
        return this.inativo;
    }

    setInativo(inativo: boolean) {
        this.inativo = inativo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}