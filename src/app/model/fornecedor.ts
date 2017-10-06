import { Endereco } from './endereco';
import { Telefone } from './telefone';

export class Fornecedor{
    private id: number;
    private razaoSocial: string;
    private tipoPessoa: string;
    private cpfCnpj: string;
    private codigoSap: string;
    private email: string;
    private endereco: Endereco;
    private telefones: Array<Telefone>;
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
    
    getRazaoSocial():string{
        return this.razaoSocial;
    }
    
    setRazaoSocial(rS:string){
        this.razaoSocial = rS;
    }
    
    getTipoPessoa():string{
        return this.tipoPessoa;
    }
    
    setTipoPessoa(tP:string){
        this.tipoPessoa = tP;
    }
    
    getCpfCnpj():string{
        return this.cpfCnpj;
    }
    
    setCpfCnpj(c:string){
        this.cpfCnpj = c;
    }
    
    getCodigoSap():string{
        return this.codigoSap;
    }
    
    setCodigoSap(cS:string){
        this.codigoSap = cS;
    }
    
    getEmail():string{
        return this.email;
    }
    
    setEmails(email:string){
        this.email = email;
    }
    
    getEndereco():Endereco{
        return this.endereco;
    }
    
    setEndereco(e:Endereco){
        this.endereco = e;
    }
    
    getTelefones():Array<Telefone>{
        return this.telefones;
    }
    
    setTelefones(telefones:Array<Telefone>){
        this.telefones = telefones;
    }
} 