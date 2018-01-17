import { FilaAtendimentoOcupacional } from './fila-atendimento-ocupacional';

export class FilaAtendimentoOcupacionalAtualizacao {
    private id: number;
    private fila: FilaAtendimentoOcupacional;
    private status: string;
    private tempo: number;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getFila() {
        return this.fila;
    }

    setFila(fila: FilaAtendimentoOcupacional) {
        this.fila = fila;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getTempo() {
        return this.tempo;
    }

    setTempo(tempo: number) {
        this.tempo = tempo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
