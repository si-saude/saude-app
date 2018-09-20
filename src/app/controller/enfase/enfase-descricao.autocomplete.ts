import {EnfaseBuilder} from '../enfase/enfase.builder';
import {EnfaseFilter} from '../enfase/enfase.filter';
import {EnfaseService} from '../enfase/enfase.service';
import {Enfase} from './../../model/enfase';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class EnfaseDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<EnfaseFilter>;

    constructor(service:EnfaseService) {
        let enfaseFilter: EnfaseFilter = new EnfaseFilter();
        
        this.autoComplete = new AutoComplete<EnfaseFilter>(
                enfaseFilter,
                this,
                service,
                new EnfaseBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(e:Enfase, eF:EnfaseFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }    
}