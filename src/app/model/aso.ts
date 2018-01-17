import { Empregado } from './empregado';
import { Atendimento } from './atendimento';

export class Aso {
    private id: number;
    private empregado: Empregado;
    private atendimento: Atendimento;
    private data: Date;
    private validade: Date;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getValidade() {
        return this.validade;
    }

    setValidade(validade: Date) {
        this.validade = validade;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento: Atendimento) {
        this.atendimento = atendimento;
    }

    getData() {
        return this.data;
    }

    setData(data: Date) {
        this.data = data;
    }
}
