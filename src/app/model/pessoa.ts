import { Endereco } from './endereco';
import { Telefone } from './telefone';
import { CustomDate} from './../generics/utils/custom-date.util';

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

    private dataNascimentoCustomDate: CustomDate = new CustomDate(this.dataNascimento);

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
    
    getDataNascimento() {
        this.dataNascimento = this.dataNascimentoCustomDate.getApiDate();
        return this.dataNascimento;
    }
    
    setDataNascimento(dataNascimento: Date) {
        this.dataNascimentoCustomDate.setApiDate(dataNascimento);
        this.dataNascimento = dataNascimento;
    }
    
    getDataNascimentoCustomDate(){
        return this.dataNascimentoCustomDate;
    }
    
    setDataNascimentoCustomDate(dataNascimentoCustomDate: CustomDate){
        this.dataNascimentoCustomDate = dataNascimentoCustomDate;
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