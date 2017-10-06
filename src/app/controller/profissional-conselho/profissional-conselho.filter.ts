import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';

export class ProfissionalConselhoFilter extends GenericFilter {
    private conselho: string;
    private uf: string;
    private numero: string;
    private vencimento: DateFilter;

    getConselho() {
        return this.conselho;
    }
    
    setConselho(conselho: string) {
        this.conselho = conselho;
    }
    
    getUf() {
        return this.uf;
    }
    
    setUf(uf: string) {
        this.uf = uf;
    }
    
    getNumero() {
        return this.numero;
    }
    
    setNumero(vencimento: string) {
        this.numero = numero;
    }
    
    getVencimento() {
        return this.vencimento;
    }
    
    setVencimento(vencimento: DateFilter) {
        this.vencimento = vencimento;
    }
}