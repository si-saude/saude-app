import { Aprho } from './aprho';
import { Empregado } from './empregado';

export class AprhoEmpregado {
 
    private id: number = 0;
    private aprho: Aprho;
    private empregado: Empregado;
    private atual: boolean;
    private version: number;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    public getAprho() {
        return this.aprho;
    }

    public setAprho(aprho: Aprho) {
        this.aprho = aprho;
    }
    
    public getEmpregado() {
        return this.empregado;
    }

    public setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }    
   
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }  
    
    getAtual():boolean{
        return this.atual;
    }
    
    setAtual(atual:boolean){
        this.atual = atual;    
    }
}