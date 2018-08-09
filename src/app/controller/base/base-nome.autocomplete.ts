import {BaseBuilder} from '../base/base.builder';
import {BaseFilter} from '../base/base.filter';
import {BaseService} from '../base/base.service';
import {Base} from './../../model/base';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class BaseNomeAutocomplete{
    
    private autoComplete:AutoComplete<BaseFilter>;

    constructor(service:BaseService) {
        let baseFilter: BaseFilter = new BaseFilter();
        
        this.autoComplete = new AutoComplete<BaseFilter>(
                baseFilter,
                this,
                service,
                new BaseBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Base, eF:BaseFilter){
        eF.setNome(e.getNome());
        return eF;
    }    
}