import { Cidade } from './cidade';
import { ProfissionalSaude } from './profissional-saude';

export class Endereco {
    id: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: Cidade;
    profissionais: Array<ProfissionalSaude>;
    version: number;

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
    
    getProfissionais() {
        return this.profissionais;
    }
    
    setProfissionais(profissionais: Array<ProfissionalSaude>) {
        this.profissionais = profissionais;
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
