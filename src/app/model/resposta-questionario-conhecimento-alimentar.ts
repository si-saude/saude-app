import { QuestionarioConhecimentoAlimentar } from './questionario-conhecimento-alimentar';
import { IndicadorConhecimentoAlimentar } from './indicador-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentar } from './item-indicador-conhecimento-alimentar';

export class RespostaQuestionarioConhecimentoAlimentar {
    private id: number;
    private questionario: QuestionarioConhecimentoAlimentar;
    private indicador: IndicadorConhecimentoAlimentar;
    private item: ItemIndicadorConhecimentoAlimentar;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getQuestionario() {
        return this.questionario;
    }

    setQuestionario(questionario) {
        this.questionario = questionario;
    }

    getIndicador() {
        return this.indicador;
    }

    setIndicador(indicador) {
        this.indicador = indicador;
    }

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
}
