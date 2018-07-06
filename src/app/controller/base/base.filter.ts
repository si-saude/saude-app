import { GenericFilter } from '../../generics/generic.filter';

export class BaseFilter extends GenericFilter {
    private nome: string;
    private uf: string;
   
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getUf() {
        return this.uf;
    }
    
    public setUf(uf: string) {
        this.uf = uf;
    }
       
}