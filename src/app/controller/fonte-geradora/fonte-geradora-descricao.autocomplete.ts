import {FonteGeradoraBuilder} from '../fonte-geradora/fonte-geradora.builder';
import {FonteGeradoraFilter} from '../fonte-geradora/fonte-geradora.filter';
import {FonteGeradoraService} from '../fonte-geradora/fonte-geradora.service';
import {FonteGeradora} from './../../model/fonte-geradora';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class FonteGeradoraDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<FonteGeradoraFilter>;

    constructor(service:FonteGeradoraService) {
        let fonteGeradoraFilter: FonteGeradoraFilter = new FonteGeradoraFilter();
        
        this.autoComplete = new AutoComplete<FonteGeradoraFilter>(
                fonteGeradoraFilter,
                this,
                service,
                new FonteGeradoraBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(e:FonteGeradora, eF:FonteGeradoraFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }    
}