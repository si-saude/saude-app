import { Cidade } from './cidade';

export class Endereco {
    private id: number;
    private logradouro: string;
    private numero: string;
    private complemento: string;
    private bairro: string;
    private cep: string;
    private cidade: Cidade;
    private version: number;

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
    
    setCidade(cidade: Cidade) {
        this.cidade = cidade;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getId(){
        return this.id;
    }
    
    setId(id: number){
        this.id = id;
    }
}
