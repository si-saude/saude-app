

export class Empregado{
    private id: number = 0;
    private nome:string;
    private cpf:string;
    private dataNascimento:Date;
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
}