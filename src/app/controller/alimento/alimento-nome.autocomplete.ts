import { AlimentoBuilder } from './alimento.builder';
import { AlimentoFilter } from './alimento.filter';
import { AlimentoService } from './alimento.service';
import { Alimento } from './../../model/alimento';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class AlimentoNomeAutocomplete{
    
    private autoComplete:AutoComplete<AlimentoFilter>;

    constructor(service:AlimentoService) {
        let alimentoFilter: AlimentoFilter = new AlimentoFilter();
        
        this.autoComplete = new AutoComplete<AlimentoFilter>(
                alimentoFilter,
                this,
                service,
                new AlimentoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(nL:Alimento, nLF:AlimentoFilter){
        nLF.setNome(nL.getNome());
        return nLF;
    }
    
    public getList(service:AlimentoService, aF:AlimentoFilter){
        return service.getListAll(aF);
    }
}