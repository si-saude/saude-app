import {PossivelDanoSaudeBuilder} from '../possivel-dano-saude/possivel-dano-saude.builder';
import {PossivelDanoSaudeFilter} from '../possivel-dano-saude/possivel-dano-saude.filter';
import {PossivelDanoSaudeService} from '../possivel-dano-saude/possivel-dano-saude.service';
import {PossivelDanoSaude} from './../../model/possivel-dano-saude';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class PossivelDanoSaudeDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<PossivelDanoSaudeFilter>;

    constructor(service:PossivelDanoSaudeService) {
        let possivelDanoSaudeFilter: PossivelDanoSaudeFilter = new PossivelDanoSaudeFilter();
        
        this.autoComplete = new AutoComplete<PossivelDanoSaudeFilter>(
                possivelDanoSaudeFilter,
                this,
                service,
                new PossivelDanoSaudeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(e:PossivelDanoSaude, eF:PossivelDanoSaudeFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }    
}