import { Equipe } from './equipe';
import { RegraAtendimentoEquipe } from './regra-atendimento-equipe';

export class RegraAtendimentoEquipeRequisito {
    private id: number;
    private equipe: Equipe;
    private regraAtendimentoEquipe: RegraAtendimentoEquipe;
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

    getRegraAtendimentoEquipe() {
        return this.regraAtendimentoEquipe;
    }

    setRegraAtendimentoEquipe(regraAtendimentoEquipe: RegraAtendimentoEquipe) {
        this.regraAtendimentoEquipe = regraAtendimentoEquipe;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
