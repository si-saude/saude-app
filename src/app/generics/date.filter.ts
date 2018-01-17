import { TypeFilter } from './type.filter';

export class DateFilter {
    inicio: Date;
    fim: Date;
    typeFilter: string;

    getInicio(): Date {
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicio = inicio;
    }
    
    getFim(): Date {
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fim = fim;
    }
    getTypeFilter(): string {
        return this.typeFilter;
    }
    setTypeFilter(typeFilter: string) {
        this.typeFilter = typeFilter;
    }
}
