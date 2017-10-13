export class Ghe {
 
    private id: number;
    private version: number;
    private nome: string;
    private codigo: string;
    private dataCriacao: Date;
    private dataDesativacao: Date;
    private descricao: string;
    private descricaoAmbiente: string;
    private descricaoTarefas: string;
    private duracaoJornada: number;
    
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
        this.dataDesativacao = dC;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
    getDescricaoAmbiente():string{
        return this.descricaoAmbiente;
    }
    
    setDescricaoAmbiente(dA:string){
        this.descricaoAmbiente = dA;
    }
    
    getDescricaoTarefas():string{
        return this.descricaoTarefas;
    }
    
    setDescricaoTarefas(dT:string){
        this.descricaoTarefas = dT;
    }
    
    getDuracaoJornada():number{
        return this.duracaoJornada;
    }
    
    setDuracaoJornada(dJ:number){
        this.duracaoJornada = dJ;
    }
}