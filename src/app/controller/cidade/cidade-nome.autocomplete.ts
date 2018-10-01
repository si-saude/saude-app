import {CidadeBuilder} from './cidade.builder';
import {CidadeFilter} from './cidade.filter';
import {CidadeService} from './cidade.service';
import {Cidade} from './../../model/cidade';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class CidadeNomeAutocomplete{
    
    private autoComplete:AutoComplete<CidadeFilter>;

    constructor(service:CidadeService) {
        this.autoComplete = new AutoComplete<CidadeFilter>(
                new CidadeFilter,
                this,
                service,
                new CidadeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(c:Cidade, cF:CidadeFilter){
        cF.setNome(c.getNome());
        return cF;
    }
}