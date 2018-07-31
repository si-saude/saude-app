import { ParteCorpoAtingidaBuilder } from './parte-corpo-atingida.builder';
import { ParteCorpoAtingidaFilter } from './parte-corpo-atingida.filter';
import { ParteCorpoAtingidaService } from './parte-corpo-atingida.service';
import { ParteCorpoAtingida } from './../../model/parte-corpo-atingida';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class ParteCorpoAtingidaDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<ParteCorpoAtingidaFilter>;

    constructor(service:ParteCorpoAtingidaService) {
        let parteCorpoAtingidaFilter: ParteCorpoAtingidaFilter = new ParteCorpoAtingidaFilter();
        
        this.autoComplete = new AutoComplete<ParteCorpoAtingidaFilter>(
                parteCorpoAtingidaFilter,
                this,
                service,
                new ParteCorpoAtingidaBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(nL:ParteCorpoAtingida, nLF:ParteCorpoAtingidaFilter){
        nLF.setDescricao(nL.getDescricao());
        return nLF;
    }
}