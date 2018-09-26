import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class ClassificacaoAfastamentoFilter extends GenericFilter {
    private descricao: string;
    private geraAfastamento: BooleanFilter = new BooleanFilter();
    
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    public getGeraAfastamento() {
        return this.geraAfastamento;
    }
    
    public setGeraAfastamento(geraAfastamento: BooleanFilter) {
        this.geraAfastamento = geraAfastamento;
    }
       
}