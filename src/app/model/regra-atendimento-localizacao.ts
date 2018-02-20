import { Localizacao } from './localizacao';
import { RegraAtendimento } from './regra-atendimento';
import { Servico } from './servico';

export class RegraAtendimentoLocalizacao {
    private id: number;
    private localizacao: Localizacao;
    private regraAtendimento: RegraAtendimento;
    private servicos: Array<Servico>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getLocalizacao() {
        return this.localizacao;
    }

    setLocalizacao(localizacao: Localizacao) {
        this.localizacao = localizacao;
    }

    getRegraAtendimento() {
        return this.regraAtendimento;
    }

    setRegraAtendimento(regraAtendimento: RegraAtendimento) {
        this.regraAtendimento = regraAtendimento;
    }

    getServicos() {
        return this.servicos;
    }

    setServicos(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
