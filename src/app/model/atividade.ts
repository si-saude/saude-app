import { Servico } from './servico';
import { Equipe } from './equipe';

export class Atividade {
    private id: number;
    private servico: Servico;
    private equipe: Equipe;
    private tempoMedio: number;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getServico() {
        return this.servico;
    }

    setServico(servico: Servico) {
        this.servico = servico;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getTempoMedio() {
        return this.tempoMedio;
    }

    setTempoMedio(tempoMedio: number) {
        this.tempoMedio = tempoMedio;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
