import { Atendimento } from './atendimento';
import { RespostaQuestionarioConhecimentoAlimentar } from './resposta-questionario-conhecimento-alimentar';

export class QuestionarioConhecimentoAlimentar {
    private id: number;
    private atendimento: Atendimento;
    private respostas: Array<RespostaQuestionarioConhecimentoAlimentar>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento) {
        this.atendimento = atendimento;
    }

    getRespostas() {
        return this.respostas;
    }

    setRespostas(respostas) {
        this.respostas = respostas;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
    
}
