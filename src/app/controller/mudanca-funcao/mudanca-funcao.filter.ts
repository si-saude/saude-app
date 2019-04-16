import { GenericFilter } from './../../generics/generic.filter';

import { TarefaFilter } from './../tarefa/tarefa.filter';
import { DateFilter } from './../../generics/date.filter';

export class MudancaFuncaoFilter extends GenericFilter {
    private tarefa: TarefaFilter;
    private dataTransferencia: DateFilter = new DateFilter(); ;
   
    constructor() {
        super();
    }

    public getTarefa() {
        return this.tarefa;
    }
    
    public setTarefa(n: TarefaFilter) {
        this.tarefa = n;
    }      
    
    getDataTransferencia() {
        return this.dataTransferencia;
    }
    setDataTransferencia(dataTransferencia: DateFilter) {
        this.dataTransferencia = dataTransferencia;
    }
}