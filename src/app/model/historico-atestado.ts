import { Profissional } from './profissional';
import { Atestado } from './atestado';

export class HistoricoAtestado {
    private id: number;
    private profissional: Profissional;
    private data: Date;
    private status: string;
    private atestado: Atestado;
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

    setProfissional(profissional) {
        this.profissional = profissional;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }

    getAtestado() {
        return this.atestado;
    }

    setAtestado(atestado) {
        this.atestado = atestado;
    }
}