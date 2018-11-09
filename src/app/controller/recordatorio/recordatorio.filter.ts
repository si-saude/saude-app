import { GenericFilter } from '../../generics/generic.filter';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';

export class RecordatorioFilter extends GenericFilter {
    private atendimento: AtendimentoFilter;
   
    constructor() {
        super();
    }

    public getAtendimento() {
        return this.atendimento;
    }
    
    public setAtendimento(a: AtendimentoFilter) {
        this.atendimento = a;
    }
       
}