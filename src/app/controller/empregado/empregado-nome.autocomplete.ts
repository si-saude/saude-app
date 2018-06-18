import {EmpregadoBuilder} from './../../controller/empregado/empregado.builder';
import {EmpregadoFilter} from './../../controller/empregado/empregado.filter';
import {EmpregadoService} from './../../controller/empregado/empregado.service';
import {Empregado} from './../../model/empregado';
import {PessoaFilter} from './../../controller/pessoa/pessoa.filter';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class EmpregadoNomeAutocomplete{
    
    private autoComplete:AutoComplete<EmpregadoFilter>;

    constructor(service:EmpregadoService) {
        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
        empregadoFilter.setPessoa(new PessoaFilter());
        
        this.autoComplete = new AutoComplete<EmpregadoFilter>(
                empregadoFilter,
                this,
                service,
                new EmpregadoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getChave() + " || " + obj.getPessoa().getNome();
    }
    
    public getFilter(e:Empregado, eF:EmpregadoFilter){
        eF.getPessoa().setNome(e.getPessoa().getNome());
        return eF;
    }
}