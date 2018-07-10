import { AgenteCausadorBuilder } from './agente-causador.builder';
import { AgenteCausadorFilter } from './agente-causador.filter';
import { AgenteCausadorService } from './agente-causador.service';
import { AgenteCausador } from './../../model/agente-causador';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class AgenteCausadorDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<AgenteCausadorFilter>;

    constructor(service:AgenteCausadorService) {
        let agenteCausadorFilter: AgenteCausadorFilter = new AgenteCausadorFilter();
        
        this.autoComplete = new AutoComplete<AgenteCausadorFilter>(
                agenteCausadorFilter,
                this,
                service,
                new AgenteCausadorBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(aC:AgenteCausador, aCF:AgenteCausadorFilter){
        aCF.setDescricao(aC.getDescricao());
        return aCF;
    }
}