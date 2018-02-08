import { GenericFilter } from './../../generics/generic.filter';
import { TarefaFilter } from './../tarefa/tarefa.filter';
import { FilaAtendimentoOcupacionalFilter } from './../fila-atendimento-ocupacional/fila-atendimento-ocupacional.filter';
import { FilaEsperaOcupacionalFilter } from './../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { AsoFilter } from './../aso/aso.filter';
import { RegraAtendimentoFilter } from './../regra-atendimento/regra-atendimento.filter';

export class AtendimentoFilter extends GenericFilter {
    private tarefa: TarefaFilter = new TarefaFilter();
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacionalFilter;
    private filaEsperaOcupacional: FilaEsperaOcupacionalFilter;
    private aso: AsoFilter;
    private regra: RegraAtendimentoFilter;

    getTarefa() {
        return this.tarefa;
    }

    setTarefa(tarefa: TarefaFilter) {
        this.tarefa = tarefa;
    }
    
    getFilaAtendimentoOcupacional() {
        return this.filaAtendimentoOcupacional;
    }

    setFilaAtendimentoOcupacional(filaAtendimentoOcupacional: FilaAtendimentoOcupacionalFilter) {
        this.filaAtendimentoOcupacional = filaAtendimentoOcupacional;
    }

    getFilaEsperaOcupacional() {
        return this.filaEsperaOcupacional;
    }

    setFilaEsperaOcupacional(filaEsperaOcupacional: FilaEsperaOcupacionalFilter) {
        this.filaEsperaOcupacional = filaEsperaOcupacional;
    }
    
    getRegra() {
        return this.regra;
    }

    setRegra(regra: RegraAtendimentoFilter) {
        this.regra = regra;
    }

    getAso() {
        return this.aso;
    }

    setAso(aso: AsoFilter) {
        this.aso = aso;
    }
}