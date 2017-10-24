import { GenericFilter } from './../../generics/generic.filter';

export class RegimeFilter extends GenericFilter {
    private nome: string;
   
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }

}