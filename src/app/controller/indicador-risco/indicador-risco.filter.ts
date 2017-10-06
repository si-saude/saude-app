import { GenericFilter } from './../../generics/generic.filter';

import { PeriodicidadeFilter } from './../periodicidade/periodicidade.filter';

export class IndicadorRiscoFilter extends GenericFilter {
    private nome: string;
    private indice0: string;
    private indice1: string;
    private indice2: string;
    private indice3: string;
    private indice4: string;
    private indice5: string;
    private periodicidade: PeriodicidadeFilter;

    public getNome() {
        return this.nome;
    }
    
    public setNome(nome: string) {
        this.nome = nome;
    }
    
    public getIndice0() {
        return this.indice0;
    }
    
    public setIndice0(indice0: string) {
        this.indice0 = indice0;
    }
    
    public getIndice1() {
        return this.indice1;
    }
    
    public setIndice1(indice1: string) {
        this.indice1 = indice1;
    }
    
    public getIndice2() {
        return this.indice2;
    }
    
    public setIndice2(indice2: string) {
        this.indice2 = indice2;
    }
    
    public getIndice3() {
        return this.indice3;
    }
    
    public setIndice3(indice3: string) {
        this.indice3 = indice3;
    }
    
    public getIndice4() {
        return this.indice4;
    }
    
    public setIndice4(indice4: string) {
        this.indice4 = indice4;
    }
    
    public getIndice5() {
        return this.indice5;
    }
    
    public setIndice5(indice5: string) {
        this.indice5 = indice5;
    }
    
    public getPeriodicidade() {
        return this.periodicidade;
    }
    
    public setPeriodicidade(periodicidade: PeriodicidadeFilter) {
        this.periodicidade = periodicidade;
    }
}