import { GenericFilter } from './../../generics/generic.filter';

import { CidadeFilter } from './../cidade/cidade.filter';

export class EnderecoFilter extends GenericFilter {
    private logradouro: string;
    private numero: string;
    private complemento: string;
    private bairro: string;
    private cep: string;
    private cidade: CidadeFilter;
    
    getLogradouro() {
        return this.logradouro;
    }
    
    setLogradouro(logradouro: string) {
        this.logradouro = logradouro;
    }
    
    getNumero() {
        return this.numero;
    }
    
    setNumero(numero: string) {
        this.numero = numero;
    }
    
    getComplemento() {
        return this.complemento;
    }
    
    setComplemento(complemento: string) {
        this.complemento = complemento;
    }
    
    getBairro() {
        return this.bairro;
    }
    
    setBairro(bairro: string) {
        this.bairro = bairro;
    }
    
    getCep() {
        return this.cep;
    }
    
    setCep(cep: string) {
        this.cep = cep;
    }
    
    getCidade() {
        return this.cidade;
    }
    
    setCidade(cidade: CidadeFilter) {
        this.cidade = cidade;
    }
    
}