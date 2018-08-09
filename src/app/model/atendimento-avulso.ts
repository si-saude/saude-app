import { FilaAtendimentoOcupacional } from './fila-atendimento-ocupacional';
import { FilaEsperaOcupacional } from './fila-espera-ocupacional';
import { Tarefa } from './tarefa';

export class AtendimentoAvulso {
    private id: number;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private filaEsperaOcupacional: FilaEsperaOcupacional;
    private tarefa: Tarefa;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getFilaAtendimentoOcupacional() {
        return this.filaAtendimentoOcupacional;
    }

    setFilaAtendimentoOcupacional(filaAtendimentoOcupacional: FilaAtendimentoOcupacional) {
        this.filaAtendimentoOcupacional = filaAtendimentoOcupacional;
    }

    getFilaEsperaOcupacional() {
        return this.filaEsperaOcupacional;
    }

    setFilaEsperaOcupacional(filaEsperaOcupacional: FilaEsperaOcupacional) {
        this.filaEsperaOcupacional = filaEsperaOcupacional;
    }

    getTarefa() {
        return this.tarefa;
    }

    setTarefa(tarefa: Tarefa) {
        this.tarefa = tarefa;
    }   

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
