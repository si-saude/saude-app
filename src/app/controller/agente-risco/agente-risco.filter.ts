import { GenericFilter } from './../../generics/generic.filter';

export class AgenteRiscoFilter extends GenericFilter {
    private descricao: string;
    private categoriaAgenteRisco: string;
   
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(n: string) {
        this.descricao = n;
    }
    
    public getCategoriaAgenteRisco() {
        return this.categoriaAgenteRisco;
    }
    
    public setCategoriaAgenteRisco(categoriaAgenteRisco: string) {
        this.categoriaAgenteRisco = categoriaAgenteRisco;
    }
       
}