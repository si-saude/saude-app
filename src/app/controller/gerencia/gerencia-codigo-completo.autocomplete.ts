import { GerenciaBuilder } from './gerencia.builder';
import { GerenciaFilter } from './gerencia.filter';
import { GerenciaService } from './gerencia.service';
import { Gerencia } from './../../model/gerencia';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class GerenciaCodigoCompletoAutocomplete{
    
    private autoComplete:AutoComplete<GerenciaFilter>;

    constructor(service:GerenciaService) {
        this.autoComplete = new AutoComplete<GerenciaFilter>(
                new GerenciaFilter(),
                this,
                service,
                new GerenciaBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getCodigoCompleto();
    }
    
    public getFilter(g:Gerencia, gF:GerenciaFilter){
        gF.setCodigoCompleto(g.getCodigoCompleto());
        return gF;
    }
}