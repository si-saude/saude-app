import { Profissional } from './profissional';

export class ProfissionalConselho {
    private id: number = 0;
    private conselho: string;
    private uf: string;
    private numero: string;
    private vencimento: Date;
    private profissional: Profissional;
    private version:number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getConselho() {
        return this.conselho;
    }

    setConselho(conselho: string) {
        this.conselho = conselho;
    }

    getUf() {
        return this.uf;
    }

    setUf(uf: string) {
        this.uf = uf;
    }

    getNumero() {
        return this.numero;
    }

    setNumero(numero: string) {
        this.numero = numero;
    }

    getVencimento() {
        return this.vencimento;
    }

    setVencimento(vencimento: Date) {
        this.vencimento = vencimento;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}