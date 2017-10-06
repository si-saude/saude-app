import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';

export class EmpregadoFilter extends GenericFilter {
    private nome: string;
    private cpf: string;
    private dataNascimento: DateFilter;
    
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getCpf() {
        return this.uf;
    }
    
    public setCpf(cpf: string) {
        this.cpf = cpf;
    }
    
    public getDataNascimento() {
        return this.dataNascimento;
    }
    
    public setDataNascimento(dataNascimento: DateFilter) {
        this.dataNascimento = dataNascimento;
    }
       
}