import {FuncaoBuilder} from '../funcao/funcao.builder';
import {FuncaoFilter} from '../funcao/funcao.filter';
import {FuncaoService} from '../funcao/funcao.service';
import {Funcao} from './../../model/funcao';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class FuncaoNomeAutocomplete{
    
    private autoComplete:AutoComplete<FuncaoFilter>;

    constructor(service:FuncaoService) {
        let funcaoFilter: FuncaoFilter = new FuncaoFilter();
        
        this.autoComplete = new AutoComplete<FuncaoFilter>(
                funcaoFilter,
                this,
                service,
                new FuncaoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Funcao, eF:FuncaoFilter){
        eF.setNome(e.getNome());
        return eF;
    }    
}