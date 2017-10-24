import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { PeriodicidadeFilter } from './../periodicidade/periodicidade.filter';

export class IndicadorRiscoAmbientalFilter extends GenericFilter {
    private nome: string;
    private periodicidade: PeriodicidadeFilter;
    private indice0: string;
    private indice1: string;
    private indice2: string;
    private indice3: string;
    private indice4: string;
    private indice5: string;
    private requisito: string;
    private critico: BooleanFilter;

    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
    getPeriodicidade() {
        return this.periodicidade;
    }
    
    setPeriodicidade(p: PeriodicidadeFilter) {
        this.periodicidade = p;
    }
    
    getIndice0() {
        return this.indice0;
    }
    
    setIndice0(i0: string) {
        this.indice0 = i0;
    }
    
    getIndice1() {
        return this.indice1;
    }
    
    setIndice1(i1: string) {
        this.indice1 = i1;
    }
    
    getIndice2() {
        return this.indice2;
    }
    
    setIndice2(i2: string) {
        this.indice2 = i2;
    }
    
    getIndice3() {
        return this.indice3;
    }
    
    setIndice3(i3: string) {
        this.indice3 = i3;
    }
    
    getIndice4() {
        return this.indice4;
    }
    
    setIndice4(i4: string) {
        this.indice4 = i4;
    }
    
    getIndice5() {
        return this.indice5;
    }
    
    setIndice5(i5: string) {
        this.indice5 = i5;
    }
    
    getRequisito() {
        return this.requisito;
    }
    
    setRequisito(r: string) {
        this.requisito = r;
    }
    
    getCritico() {
        return this.critico;
    }
    
    setCritico(c: BooleanFilter) {
        this.critico = c;
    }
    
}