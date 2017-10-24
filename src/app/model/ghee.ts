export class Ghee {
 
    private id: number = 0;
    private version: number;
    private nome: string;
    private codigo: string;
    private dataCriacao: Date;
    private dataDesativacao: Date;
    private descricao: string;
    
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
    
    getCodigo():string{
        return this.codigo;
    }
    
    setCodigo(codigo:string){
        this.codigo = codigo;
    }
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getDataCriacao():Date{
        return this.dataCriacao;
    }
    
    setDataCriacao(dC:Date){
        this.dataCriacao = dC;
    }
    
    getDataDesativacao():Date{
        return this.dataDesativacao;
    }
    
    setDataDesativacao(dD:Date){
        this.dataDesativacao = dD;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
}