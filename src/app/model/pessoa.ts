import { Endereco } from './endereco';
import { Telefone } from './telefone';

export class Pessoa {
    private id: number = 0;
    private nome:string;
    private cpf:string;
    private dataNascimento:Date;
    private rg: string;
    private sexo: string = "";
    private telefones: Array<Telefone>;
    private endereco: Endereco;
    private version: number;
    private email: string;
    private idade: number;

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
    
    getIdade(): number {
        return this.idade;
    }
    
    setIdade(idade: number) {
        this.idade = idade;
    }
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getCpf():string{
        return this.cpf;
    }
    
    setCpf(cpf:string){
        this.cpf = cpf;
    }
    
    getDataNascimento():Date{
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: Date){
        this.dataNascimento = dN;
    }
    
    getRg(): string{
        return this.rg;
    }
    
    setRg(rg: string){
        this.rg = rg;
    }
    
    getSexo(): string{
        return this.sexo;
    }
    
    setSexo(sexo: string){
        this.sexo = sexo;
    }
    
    getTelefones(): Array<Telefone>{
        return this.telefones;
    }
    
    setTelefones(telefones: Array<Telefone>){
        this.telefones = telefones;
    }

    getEndereco(): Endereco{
        return this.endereco;
    }
    
    setEndereco(endereco: Endereco){
        this.endereco = endereco;
    }
    
    getEmail(): string {
        return this.email;
    }
    
    setEmail(email: string) {
        this.email = email;
    }
}