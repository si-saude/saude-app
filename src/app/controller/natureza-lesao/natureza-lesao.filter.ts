import { GenericFilter } from '../../generics/generic.filter';

export class NaturezaLesaoFilter extends GenericFilter {
    private codigo: string;
    private descricao: string;
   
    constructor() {
        super();
    }

    public getCodigo() {
        return this.codigo;
    }
    
    public setCodigo(c: string) {
        this.codigo = c;
    }
    
    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(d: string) {
        this.descricao = d;
    }
       
}