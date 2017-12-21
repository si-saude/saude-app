import { DateFilter } from './../../generics/date.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class FeriadoFilter extends GenericFilter {
    private titulo:string;
    private data: DateFilter = new DateFilter();
    
    getTitulo():string{
        return this.titulo;
    }
    
    setTitulo(titulo:string){
        this.titulo = titulo;
    }
    
    getData():DateFilter{
        return this.data;
    }
    
    setData(dN: DateFilter){
        this.data = dN;
    }    
}