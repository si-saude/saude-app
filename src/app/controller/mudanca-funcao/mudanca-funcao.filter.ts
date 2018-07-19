import { GenericFilter } from './../../generics/generic.filter';

import { TarefaFilter } from './../tarefa/tarefa.filter';

export class MudancaFuncaoFilter extends GenericFilter {
    private tarefa: TarefaFilter;
   
    constructor() {
        super();
    }

    public getTarefa() {
        return this.tarefa;
    }
    
    public setTarefa(n: TarefaFilter) {
        this.tarefa = n;
    }       
}