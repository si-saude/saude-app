import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';

import { GheFilter } from './../ghe/ghe.filter';

export class AprhoFilter extends GenericFilter {
    private empresa: string;
    private dataRevisao: DateFilter = new DateFilter();
    private data: DateFilter = new DateFilter(); 
    private ghe: GheFilter = new GheFilter ();
   
    constructor() {
        super();
    }
    
    public getEmpresa(): string {
        return this.empresa;
    }
    
    public setEmpresa(empresa: string) {
        this.empresa = empresa;
    }
    
    public getData() {
        return this.data;
    }

    public setData(data: DateFilter) {
        this.data = data;
    }
    
    public getDataRevisao() {
        return this.dataRevisao;
    }

    public setDataRevisao(dataRevisao: DateFilter) {
        this.dataRevisao = dataRevisao;
    }
    
    public getGhe() {
        return this.ghe;
    }

    public setGhe(ghe: GheFilter) {
        this.ghe = ghe;
    }
}