import { RegraAtendimentoEquipe } from './regra-atendimento-equipe';

export class RegraAtendimento {
    private id: number;
    private nome: string;
    private regraAtendimentoEquipes: Array<RegraAtendimentoEquipe>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }
    
    getRegraAtendimentoEquipes() {
        return this.regraAtendimentoEquipes;
    }

    setRegraAtendimentoEquipes(regraAtendimentoEquipes: Array<RegraAtendimentoEquipe>) {
        this.regraAtendimentoEquipes = regraAtendimentoEquipes;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
