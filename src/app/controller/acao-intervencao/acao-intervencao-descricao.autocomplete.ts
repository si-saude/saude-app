import {AcaoIntervencaoBuilder} from '../acao-intervencao/acao-intervencao.builder';
import {AcaoIntervencaoFilter} from '../acao-intervencao/acao-intervencao.filter';
import {AcaoIntervencaoService} from '../acao-intervencao/acao-intervencao.service';
import {AcaoIntervencao} from './../../model/acao-intervencao';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class AcaoIntervencaoDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<AcaoIntervencaoFilter>;

    constructor(service:AcaoIntervencaoService, acaoIntervencaoFilter: AcaoIntervencaoFilter) {
        
        this.autoComplete = new AutoComplete<AcaoIntervencaoFilter>(
                acaoIntervencaoFilter,
                this,
                service,
                new AcaoIntervencaoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(e:AcaoIntervencao, eF:AcaoIntervencaoFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }    
}