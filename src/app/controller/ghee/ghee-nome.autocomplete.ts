import {GheeBuilder} from '../ghee/ghee.builder';
import {GheeFilter} from '../ghee/ghee.filter';
import {GheeService} from '../ghee/ghee.service';
import {Ghee} from './../../model/ghee';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class GheeNomeAutocomplete{
    
    private autoComplete:AutoComplete<GheeFilter>;

    constructor(service:GheeService) {
        let gheeFilter: GheeFilter = new GheeFilter();
        
        this.autoComplete = new AutoComplete<GheeFilter>(
                gheeFilter,
                this,
                service,
                new GheeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Ghee, eF:GheeFilter){
        eF.setNome(e.getNome());
        return eF;
    }    
}