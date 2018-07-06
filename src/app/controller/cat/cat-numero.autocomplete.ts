import { CatBuilder } from './cat.builder';
import { CatFilter } from './cat.filter';
import { CatService } from './cat.service';
import { Cat } from './../../model/cat';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class CatNumeroAutocomplete{
    
    private autoComplete:AutoComplete<CatFilter>;

    constructor(service:CatService) {
        let catFilter: CatFilter = new CatFilter();
        
        this.autoComplete = new AutoComplete<CatFilter>(
                catFilter,
                this,
                service,
                new CatBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNumero();
    }
    
    public getFilter(c:Cat, cF:CatFilter){
        cF.setNumero(c.getNumero());
        return cF;
    }
}