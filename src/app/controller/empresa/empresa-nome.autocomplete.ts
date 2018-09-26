import { EmpresaBuilder } from './empresa.builder';
import { EmpresaFilter } from './empresa.filter';
import { EmpresaService } from './empresa.service';
import { Empresa } from './../../model/empresa';

import { AutoComplete } from './../../generics/utils/autocomplete.util'

export class EmpresaNomeAutocomplete{
    
    private autoComplete:AutoComplete<EmpresaFilter>;

    constructor(service:EmpresaService) {
        let empresaFilter: EmpresaFilter = new EmpresaFilter();
        
        this.autoComplete = new AutoComplete<EmpresaFilter>(
                empresaFilter,
                this,
                service,
                new EmpresaBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Empresa, eF:EmpresaFilter){
        eF.setNome(e.getNome());
        return eF;
    }
}