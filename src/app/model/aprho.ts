import { Ghe } from './ghe';
import { AprhoItem } from './aprho-item';

export class Aprho {
 
    private id: number = 0;
    private empresa: string;
    private data: Date;
    private ghe: Ghe;
    private aprhoItens: Array<AprhoItem>;
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
    
    getEmpresa(): string {
        return this.empresa;
    }
    
    setEmpresa(empresa: string) {
        this.empresa = empresa;
    }
    
    public getData() {
        return this.data;
    }

    public setData(data: Date) {
        this.data = data;
    }
    public getGhe() {
        return this.ghe;
    }

    public setGhe(ghe: Ghe) {
        this.ghe = ghe;
    }
    
    getAprhoItens():Array<AprhoItem>{
        return this.aprhoItens;
    }
    
    setAprhoItens(aprhoItens:Array<AprhoItem>){
        this.aprhoItens = aprhoItens;
    }
}