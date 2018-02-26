import { EquipeFilter } from './../equipe/equipe.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class IndicadorSastFilter extends GenericFilter {
    private nome: string;
    private indice0: string;
    private indice1: string;
    private indice2: string;
    private indice3: string;
    private indice4: string;
    private indice5: string;
    private codigo: string;
    private codigoExcludente: string;
    private equipe: EquipeFilter;
    private obrigatorio: BooleanFilter;
    private inativo: BooleanFilter;
    
    getNome() {
        return this.nome;
    }
    setNome(nome: string) {
        this.nome = nome;
    }
    getIndice0() {
        return this.indice0;
    }
    setIndice0(indice0: string) {
        this.indice0 = indice0;
    }
    getIndice1() {
        return this.indice1;
    }
    setIndice1(indice1: string) {
        this.indice1 = indice1;
    }
    getIndice2() {
        return this.indice2;
    }
    setIndice2(indice2: string) {
        this.indice2 = indice2;
    }
    getIndice3() {
        return this.indice3;
    }
    setIndice3(indice3: string) {
        this.indice3 = indice3;
    }
    getIndice4() {
        return this.indice4;
    }
    setIndice4(indice4: string) {
        this.indice4 = indice4;
    }
    getIndice5() {
        return this.indice5;
    }
    setIndice5(indice5: string) {
        this.indice5 = indice5;
    }
    getCodigo() {
        return this.codigo;
    }
    setCodigo(codigo: string) {
        this.codigo = codigo;
    }
    getCodigoExcludente() {
        return this.codigoExcludente;
    }
    setCodigoExcludente(codigoExcludente: string) {
        this.codigoExcludente = codigoExcludente;
    }
    getEquipe() {
        return this.equipe;
    }
    setEquipe(equipe:EquipeFilter) {
        this.equipe = equipe;
    }
    getObrigatorio() {
        return this.obrigatorio;
    }
    setObrigatorio(obrigatorio: BooleanFilter) {
        this.obrigatorio = obrigatorio;
    }
    getInativo() {
        return this.inativo;
    }
    setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }
    
}
