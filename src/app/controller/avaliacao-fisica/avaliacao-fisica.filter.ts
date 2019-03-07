import { GenericFilter } from '../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';

export class AvaliacaoFisicaFilter extends GenericFilter {
    private atendimento: AtendimentoFilter = new AtendimentoFilter();
    
    constructor() {
        super();
    }

    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento: AtendimentoFilter) {
        this.atendimento = atendimento;
    }
           
}