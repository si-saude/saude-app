import {ExameBuilder} from './../../controller/exame/exame.builder';
import {ExameFilter} from './../../controller/exame/exame.filter';
import {ExameService} from './../../controller/exame/exame.service';
import {Exame} from './../../model/exame';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class ExameDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<ExameFilter>;

    constructor(service:ExameService) {
        let exameFilter: ExameFilter = new ExameFilter();
        
        this.autoComplete = new AutoComplete<ExameFilter>(
                exameFilter,
                this,
                service,
                new ExameBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getCodigo() + " - " + obj.getDescricao();
    }
    
    public getFilter(e:Exame, eF:ExameFilter){
        eF.setDescricao(e.getDescricao());
        return eF;
    }
}