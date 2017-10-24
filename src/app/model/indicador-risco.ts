import { Periodicidade } from './periodicidade';

export abstract class IndicadorRisco {
    private id: number = 0;
    private version: number;
    private nome: string;
    private periodicidade: Periodicidade;
    private indice0: string;
    private indice1: string;
    private indice2: string;
    private indice3: string;
    private indice4: string;
    private indice5: string;
    private requisito: string = "";
    private critico: boolean;

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
    
    getPeriodicidade():Periodicidade{
        return this.periodicidade;
    }
    
    setPeriodicidade(p:Periodicidade){
        this.periodicidade = p;
    }
    
    getIndice0():string{
        return this.indice0;
    }
    
    setIndice0(i:string){
        this.indice0 = i;
    }
    
    getIndice1():string{
        return this.indice1;
    }
    
    setIndice1(i:string){
        this.indice1 = i;
    }
    
    getIndice2():string{
        return this.indice2;
    }
    
    setIndice2(i:string){
        this.indice2 = i;
    }
    
    getIndice3():string{
        return this.indice3;
    }
    
    setIndice3(i:string){
        this.indice3 = i;
    }
    
    getIndice4():string{
        return this.indice4;
    }
    
    setIndice4(i:string){
        this.indice4 = i;
    }
    
    getIndice5():string{
        return this.indice5;
    }
    
    setIndice5(i:string){
        this.indice5 = i;
    }
    
    public getRequisito():string{
        return this.requisito;
    }
    
    public setRequisito(requisito:string){
        this.requisito = requisito;
    }
    
    public getCritico():boolean{
        return this.critico;
    }
    
    public setCritico(critico:boolean){
        this.critico = critico;
    }
}