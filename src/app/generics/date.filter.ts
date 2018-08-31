import { TypeFilter } from './type.filter';
import { CustomDate} from './../generics/utils/custom-date.util';

export class DateFilter {
    inicio: Date;
    fim: Date;
    inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    fimCustomDate: CustomDate = new CustomDate(this.fim);
    typeFilter: string;

    getInicio(): Date {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getFim(): Date {
        this.fim = this.fimCustomDate.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomDate.setApiDate(fim);
        this.fim = fim;
    }
    
    getInicioCustomDate(){
        return this.inicioCustomDate;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }

    getFimCustomDate(){
        return this.fimCustomDate;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
    }
    
    
    getTypeFilter(): string {
        return this.typeFilter;
    }
    setTypeFilter(typeFilter: string) {
        this.typeFilter = typeFilter;
    }
}
