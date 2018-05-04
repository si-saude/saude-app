import { RegraAtendimento } from './regra-atendimento';
import { RegraAtendimentoEquipeRequisito } from './regra-atendimento-equipe-requisito';
import { Equipe } from './equipe';

export class RegraAtendimentoEquipe {
    private id: number;
    private regraAtendimento: RegraAtendimento;
    private equipe: Equipe;
    private regraAtendimentoEquipeRequisitos: Array<RegraAtendimentoEquipeRequisito>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getRegraAtendimento() {
        return this.regraAtendimento;
    }

    setRegraAtendimento(regraAtendimento: RegraAtendimento) {
        this.regraAtendimento = regraAtendimento;
    }
    
    getRegraAtendimentoEquipeRequisitos() {
        return this.regraAtendimentoEquipeRequisitos;
    }

    setRegraAtendimentoEquipeRequisitos( regraAtendimentoEquipeRequisitos: Array<RegraAtendimentoEquipeRequisito> ) {
        this.regraAtendimentoEquipeRequisitos = regraAtendimentoEquipeRequisitos;
    }
    
    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
