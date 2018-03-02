import { PerguntaFichaColeta } from './pergunta-ficha-coleta';

export class ItemPerguntaFichaColeta {
    private id: number;
    private label: string;
    private pergunta: PerguntaFichaColeta;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getLabel() {
        return this.label;
    }

    setLabel(label: string) {
        this.label = label;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getPergunta() {
        return this.pergunta;
    }

    setPergunta(pergunta: PerguntaFichaColeta) {
        this.pergunta = pergunta;
    }
}
