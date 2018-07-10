import { NaturezaLesaoBuilder } from './natureza-lesao.builder';
import { NaturezaLesaoFilter } from './natureza-lesao.filter';
import { NaturezaLesaoService } from './natureza-lesao.service';
import { NaturezaLesao } from './../../model/natureza-lesao';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class NaturezaLesaoDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<NaturezaLesaoFilter>;

    constructor(service:NaturezaLesaoService) {
        let naturezaLesaoFilter: NaturezaLesaoFilter = new NaturezaLesaoFilter();
        
        this.autoComplete = new AutoComplete<NaturezaLesaoFilter>(
                naturezaLesaoFilter,
                this,
                service,
                new NaturezaLesaoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(nL:NaturezaLesao, nLF:NaturezaLesaoFilter){
        nLF.setDescricao(nL.getDescricao());
        return nLF;
    }
}