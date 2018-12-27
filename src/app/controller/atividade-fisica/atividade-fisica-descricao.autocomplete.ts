import {AtividadeFisicaBuilder} from './atividade-fisica.builder';
import {AtividadeFisicaFilter} from './atividade-fisica.filter';
import {AtividadeFisicaService} from './atividade-fisica.service';
import {AtividadeFisica} from './../../model/atividade-fisica';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class AtividadeFisicaDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<AtividadeFisicaFilter>;

    constructor(service:AtividadeFisicaService) {
        let atividadeFisicaFilter: AtividadeFisicaFilter = new AtividadeFisicaFilter();
        
        this.autoComplete = new AutoComplete<AtividadeFisicaFilter>(
                atividadeFisicaFilter,
                this,
                service,
                new AtividadeFisicaBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(aF:AtividadeFisica, aFF:AtividadeFisicaFilter){
        aFF.setDescricao(aF.getDescricao());
        return aFF;
    }
}