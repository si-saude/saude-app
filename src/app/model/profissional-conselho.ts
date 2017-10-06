import { ProfissionalSaude } from './profissional-saude';

export class ProfissionalConselho {
    id: number;
    conselho: string;
    uf: string;
    numero: string;
    vencimento: Date;
    profissional: ProfissionalSaude;

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

    setProfissional(profissional: ProfissionalSaude) {
        this.profissional = profissional;
    }
}