import {PessoaBuilder} from './../../controller/pessoa/pessoa.builder';
import {PessoaFilter} from './../../controller/pessoa/pessoa.filter';
import {PessoaService} from './../../controller/pessoa/pessoa.service';
import {Pessoa} from './../../model/pessoa';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class PessoaNomeAutocomplete{
    
    private autoComplete:AutoComplete<PessoaFilter>;

    constructor(service:PessoaService) {
        
        this.autoComplete = new AutoComplete<PessoaFilter>(
                new PessoaFilter(),
                this,
                service,
                new PessoaBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(p:Pessoa, pF:PessoaFilter){
        pF.setNome(p.getNome());
        return pF;
    }
}