import { GenericFilter } from './../../generics/generic.filter';
import { TarefaFilter } from './../tarefa/tarefa.filter';
import { AsoFilter } from './../aso/aso.filter';
import { RegraAtendimentoFilter } from './../regra-atendimento/regra-atendimento.filter';

export class AtendimentoFilter extends GenericFilter {
    private tarefa: TarefaFilter = new TarefaFilter();
    private aso: AsoFilter;
    private regra: RegraAtendimentoFilter;

    getTarefa() {
        return this.tarefa;
    }

    setTarefa(tarefa: TarefaFilter) {
        this.tarefa = tarefa;
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