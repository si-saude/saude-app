import {CnaeBuilder} from './cnae.builder';
import {CnaeFilter} from './cnae.filter';
import {CnaeService} from './cnae.service';
import {Cnae} from './../../model/cnae';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class CnaeCodigoAutocomplete{
    
    private autoComplete:AutoComplete<CnaeFilter>;

    constructor(service:CnaeService, cnaeFilter: CnaeFilter) {
        this.autoComplete = new AutoComplete<CnaeFilter>(
                cnaeFilter,
                this,
                service,
                new CnaeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getCodigo();
    }
    
    public getFilter(c:Cnae, cF:CnaeFilter){
        cF.setCodigo(c.getCodigo());
        return cF;
    }
}