import {GheBuilder} from '../ghe/ghe.builder';
import {GheFilter} from '../ghe/ghe.filter';
import {GheService} from '../ghe/ghe.service';
import {Ghe} from './../../model/ghe';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class GheNomeAutocomplete{
    
    private autoComplete:AutoComplete<GheFilter>;

    constructor(service:GheService) {
        let gheFilter: GheFilter = new GheFilter();
        
        this.autoComplete = new AutoComplete<GheFilter>(
                gheFilter,
                this,
                service,
                new GheBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Ghe, eF:GheFilter){
        eF.setNome(e.getNome());
        return eF;
    }
    
    public getList(service:GheService, eF:GheFilter){
        return service.getGhesAtivos(eF);
    }
}