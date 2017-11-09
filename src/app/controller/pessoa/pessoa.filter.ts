import { DateFilter } from './../../generics/date.filter';

export class PessoaFilter {
    private nome:string;
    private cpf:string;
    private dataNascimento: DateFilter = new DateFilter();
    private rg: string;
    private sexo: string;

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
    
    getDataNascimento():DateFilter{
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: DateFilter){
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
    
}