import { GenericFilter } from './../../generics/generic.filter';

export class TelefoneFilter extends GenericFilter {
    private numero: string;

    getNumero() {
        return this.numero;
    }
    
    setNumero(numero: string) {
        this.numero = numero;
    }
    
}