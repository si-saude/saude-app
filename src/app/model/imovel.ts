import { Base } from './base';

export class Imovel {
    private id: number;
    private nome: string;
    private base: Base;
    private version: number;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getNome() {
        return this.nome;
    }

    public setNome(nome) {
        this.nome = nome;
    }

    public getBase() {
        return this.base;
    }

    public setBase(base) {
        this.base = base;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
}
