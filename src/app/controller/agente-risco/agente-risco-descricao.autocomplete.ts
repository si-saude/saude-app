import {AgenteRiscoBuilder} from '../agente-risco/agente-risco.builder';
import {AgenteRiscoFilter} from '../agente-risco/agente-risco.filter';
import {AgenteRiscoService} from '../agente-risco/agente-risco.service';
import {AgenteRisco} from './../../model/agente-risco';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class AgenteRiscoDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<AgenteRiscoFilter>;

    constructor(service:AgenteRiscoService) {
        let agenteRiscoFilter: AgenteRiscoFilter = new AgenteRiscoFilter();
        
        this.autoComplete = new AutoComplete<AgenteRiscoFilter>(
                agenteRiscoFilter,
                this,
                service,
                new AgenteRiscoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(e:AgenteRisco, eF:AgenteRiscoFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }    
}