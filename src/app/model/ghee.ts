import { CustomDate} from './../generics/utils/custom-date.util';

export class Ghee {
 
    private id: number = 0;
    private version: number;
    private nome: string;
    private codigo: string;
    private dataCriacao: Date;
    private dataDesativacao: Date;
    private descricao: string;

    private dataCriacaoCustomDate: CustomDate = new CustomDate(this.dataCriacao);
    private dataDesativacaoCustomDate: CustomDate = new CustomDate(this.dataDesativacao);

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
    
    getDataCriacao() {
        this.dataCriacao = this.dataCriacaoCustomDate.getApiDate();
        return this.dataCriacao;
    }
    
    setDataCriacao(dataCriacao: Date) {
        this.dataCriacaoCustomDate.setApiDate(dataCriacao);
        this.dataCriacao = dataCriacao;
    }
    
    getDataCriacaoCustomDate(){
        return this.dataCriacaoCustomDate;
    }
    
    setDataCriacaoCustomDate(dataCriacaoCustomDate: CustomDate){
        this.dataCriacaoCustomDate = dataCriacaoCustomDate;
    }
    
    getDataDesativacao() {
        this.dataDesativacao = this.dataDesativacaoCustomDate.getApiDate();
        return this.dataDesativacao;
    }
    
    setDataDesativacao(dataDesativacao: Date) {
        this.dataDesativacaoCustomDate.setApiDate(dataDesativacao);
        this.dataDesativacao = dataDesativacao;
    }
    
    getDataDesativacaoCustomDate(){
        return this.dataDesativacaoCustomDate;
    }
    
    setDataDesativacaoCustomDate(dataDesativacaoCustomDate: CustomDate){
        this.dataDesativacaoCustomDate = dataDesativacaoCustomDate;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
}