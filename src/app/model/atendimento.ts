import { FilaAtendimentoOcupacional } from './fila-atendimento-ocupacional';
import { FilaEsperaOcupacional } from './fila-espera-ocupacional';
import { Tarefa } from './tarefa';
import { Aso } from './aso';
import { Triagem } from './triagem';
import { RegraAtendimento } from './regra-atendimento';

export class Atendimento {
    private id: number;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private filaEsperaOcupacional: FilaEsperaOcupacional;
    private triagens: Array<Triagem>;
    private tarefa: Tarefa;
    private aso: Aso;
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
    
    getTriagens() {
        return this.triagens;
    }
    
    setTriagens(triagens: Array<Triagem>) {
        this.triagens = triagens;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getAso() {
        return this.aso;
    }

    setAso(aso: Aso) {
        this.aso = aso;
    }
}
