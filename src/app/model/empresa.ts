import { Cidade } from './cidade';
import { Cnae } from './cnae';

export class Empresa {
    private id: number = 0;
    private nome: string;
    private cnpj: string;
    private cep: string;
    private endereco: string;
    private municipio: Cidade;
    private telefone: string;
    private bairro: string;
    private cnaes: Array<Cnae>;
    private version: number;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getNome(): string {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getCnpj() {
        return this.cnpj;
    }

    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }

    getCep() {
        return this.cep;
    }

    setCep(cep) {
        this.cep = cep;
    }

    getEndereco() {
        return this.endereco;
    }

    setEndereco(endereco) {
        this.endereco = endereco;
    }

    getMunicipio() {
        return this.municipio;
    }

    setMunicipio(municipio) {
        this.municipio = municipio;
    }

    getTelefone() {
        return this.telefone;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }
    
    getBairro() {
        return this.bairro;
    }

    setBairro(bairro) {
        this.bairro = bairro;
    }
    
    getCnaes() {
        return this.cnaes;
    }

    setCnaes(cnaes) {
        this.cnaes = cnaes;
    }
    
}