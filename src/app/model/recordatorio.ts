import { Refeicao } from './refeicao';
import { Atendimento } from './atendimento';

export class Recordatorio {
    private id: number;
    private refeicoes: Array<Refeicao> ;
    private atendimento: Atendimento;
    private version: number;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getRefeicoes() {
        return this.refeicoes;
    }

    public setRefeicoes(refeicoes) {
        this.refeicoes = refeicoes;
    }

    public getAtendimento() {
        return this.atendimento;
    }

    public setAtendimento(atendimento) {
        this.atendimento = atendimento;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
}
