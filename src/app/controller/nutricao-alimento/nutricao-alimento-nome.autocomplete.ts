import { NutricaoAlimentoBuilder } from './nutricao-alimento.builder';
import { NutricaoAlimentoFilter } from './nutricao-alimento.filter';
import { NutricaoAlimentoService } from './nutricao-alimento.service';
import { NutricaoAlimento } from './../../model/nutricao-alimento';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class NutricaoAlimentoNomeAutocomplete{
    
    private autoComplete:AutoComplete<NutricaoAlimentoFilter>;

    constructor(service:NutricaoAlimentoService) {
        let nutricaoAlimentoFilter: NutricaoAlimentoFilter = new NutricaoAlimentoFilter();
        
        this.autoComplete = new AutoComplete<NutricaoAlimentoFilter>(
                nutricaoAlimentoFilter,
                this,
                service,
                new NutricaoAlimentoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(nL:NutricaoAlimento, nLF:NutricaoAlimentoFilter){
        nLF.setNome(nL.getNome());
        return nLF;
    }
}