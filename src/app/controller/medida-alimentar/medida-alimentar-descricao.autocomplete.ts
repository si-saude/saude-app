import {MedidaAlimentarBuilder} from './medida-alimentar.builder';
import {MedidaAlimentarFilter} from './medida-alimentar.filter';
import {MedidaAlimentarService} from './medida-alimentar.service';
import {MedidaAlimentar} from './../../model/medida-alimentar';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class MedidaAlimentarDescricaoAutocomplete{
    
    private autoComplete:AutoComplete<MedidaAlimentarFilter>;

    constructor(service:MedidaAlimentarService) {
        let medidaAlimentarFilter: MedidaAlimentarFilter = new MedidaAlimentarFilter();
        
        this.autoComplete = new AutoComplete<MedidaAlimentarFilter>(
                medidaAlimentarFilter,
                this,
                service,
                new MedidaAlimentarBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getDescricao();
    }
    
    public getFilter(i:MedidaAlimentar, iF:MedidaAlimentarFilter){
        iF.setDescricao(i.getDescricao());
        return iF;
    }
}