import { Ghe } from './ghe';
import { AprhoItem } from './aprho-item';
import { AprhoEmpregado } from './aprho-empregado';
import { Profissional } from './profissional';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Aprho {
 
    private id: number = 0;
    private empresa: string;
    private revisao: string;
    private data: Date;
    private ghe: Ghe;
    private aprovador: Profissional;
    private elaboradores: Array<Profissional>;
    private aprhoItens: Array<AprhoItem>;
    private aprhoEmpregados: Array<AprhoEmpregado>;
    private version: number;
    private dataRevisao: Date;
    private dataRevisaoCustomDate: CustomDate = new CustomDate(this.dataRevisao);
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
    
    getRevisao(): string {
        return this.revisao;
    }
    
    setRevisao(revisao: string) {
        this.revisao = revisao;
    }
    getEmpresa(): string {
        return this.empresa;
    }
    
    setEmpresa(empresa: string) {
        this.empresa = empresa;
    }
    
    public getAprovador() {
        return this.aprovador;
    }

    public setAprovador(aprovador: Profissional) {
        this.aprovador = aprovador;
    }
    
    public getGhe() {
        return this.ghe;
    }

    public setGhe(ghe: Ghe) {
        this.ghe = ghe;
    }
    
    getElaboradores():Array<Profissional>{
        return this.elaboradores;
    }
    
    setElaboradores(elaboradores:Array<Profissional>){
        this.elaboradores = elaboradores;
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
    
    getDataRevisao() {
        this.dataRevisao = this.dataRevisaoCustomDate.getApiDate();
        return this.dataRevisao;
    }
    
    setDataRevisao(dataRevisao: Date) {
        this.dataRevisaoCustomDate.setApiDate(dataRevisao);
        this.dataRevisao = dataRevisao;
    }
    
    
    getDataRevisaoCustomDate(){
        return this.dataRevisaoCustomDate;
    }
    
    setDataRevisaoCustomDate(dataRevisaoCustomDate: CustomDate){
        this.dataRevisaoCustomDate = dataRevisaoCustomDate;
    }
}