import { GenericFilter } from './../../generics/generic.filter';

export class CatFilter extends GenericFilter {
    private numero: string;
    
    constructor() {
        super();
    }

    public getNumero() {
        return this.numero;
    }
    
    public setNumero(n: string) {
        this.numero = n;
    }
       
}