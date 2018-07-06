import { FornecedorBuilder } from './fornecedor.builder';
import { FornecedorFilter } from './fornecedor.filter';
import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from './../../model/fornecedor';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class FornecedorRazaoSocialAutocomplete{
    
    private autoComplete:AutoComplete<FornecedorFilter>;

    constructor(service:FornecedorService) {
        let fornecedorFilter: FornecedorFilter = new FornecedorFilter();
        
        this.autoComplete = new AutoComplete<FornecedorFilter>(
                fornecedorFilter,
                this,
                service,
                new FornecedorBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getRazaoSocial();
    }
    
    public getFilter(f:Fornecedor, fF:FornecedorFilter){
        fF.setRazaoSocial(f.getRazaoSocial());
        return fF;
    }
}