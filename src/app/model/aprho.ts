import { Ghe } from './ghe';
import { AprhoItem } from './aprho-item';
import { AprhoEmpregado } from './aprho-empregado';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Aprho {
 
    private id: number = 0;
    private empresa: string;
    private data: Date;
    private ghe: Ghe;
    private aprhoItens: Array<AprhoItem>;
    private aprhoEmpregados: Array<AprhoEmpregado>;
    private version: number;
    private dataCustomDate: CustomDate = new CustomDate(this.data);

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
    
    getAprhoEmpregados():Array<AprhoEmpregado>{
        return this.aprhoEmpregados;
    }
    
    setAprhoEmpregados(aprhoEmpregados:Array<AprhoEmpregado>){
        this.aprhoEmpregados = aprhoEmpregados;
    }
    
    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }
    
    
    getDataCustomDate(){
        return this.dataCustomDate;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
}