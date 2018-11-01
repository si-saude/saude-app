import { GenericFilter } from './../../generics/generic.filter';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';

export class QuestionarioConhecimentoAlimentarFilter extends GenericFilter {
    private atendimento: AtendimentoFilter;
    
    getAtendimento() {
        return this.atendimento;
    }
    
    setAtendimento(atendimento: AtendimentoFilter) {
        this.atendimento = atendimento;
    }
    
       
}