import { Empregado } from './empregado';

export class Gerencia {
    private id: number = 0;
    private codigo: string;
    private codigoCompleto: string;
    private descricao: string;
    private gerencia: Gerencia;
    private gerente: Empregado;
    private secretario1: Empregado;
    private secretario2: Empregado;
    private ausentePeriodico: boolean;
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
    
    getCodigo():string{
        return this.codigo;
    }
    
    setCodigo(codigo:string){
        this.codigo = codigo;
    }
    
    getCodigoCompleto():string{
        return this.codigoCompleto;
    }
    
    setCodigoCompleto(cC:string){
        this.codigoCompleto = cC;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
    getGerencia():Gerencia{
        return this.gerencia;
    }
    
    setGerencia(g:Gerencia){
        this.gerencia = g;
    }
    
    getGerente():Empregado{
        return this.gerente;
    }
    
    setGerente(g:Empregado){
        this.gerente = g;
    }
    
    getSecretario1():Empregado{
        return this.secretario1;
    }
    
    setSecretario1(s:Empregado){
        this.secretario1 = s;
    }
    
    getSecretario2():Empregado{
        return this.secretario2;
    }
    
    setSecretario2(s:Empregado){
        this.secretario2 = s;
    }
    
    getAusentePeriodico():boolean{
        return this.ausentePeriodico;
    }
    
    setAusentePeriodico(ausentePeriodico:boolean){
        this.ausentePeriodico = ausentePeriodico;
    }
}