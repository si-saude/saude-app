import {EmpregadoBuilder} from './../../controller/empregado/empregado.builder';
import {EmpregadoFilter} from './../../controller/empregado/empregado.filter';
import {EmpregadoService} from './../../controller/empregado/empregado.service';
import {Empregado} from './../../model/empregado';
import {PessoaFilter} from './../../controller/pessoa/pessoa.filter';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class EmpregadoMatriculaAutocomplete{
    
    private autoComplete:AutoComplete<EmpregadoFilter>;

    constructor(service:EmpregadoService) {
        this.autoComplete = new AutoComplete<EmpregadoFilter>(
                new EmpregadoFilter(),
                this,
                service,
                new EmpregadoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getMatricula() + " - " + obj.getPessoa().getNome();
    }
    
    public getFilter(e:Empregado, eF:EmpregadoFilter){
        eF.setMatricula(e.getMatricula());
        return eF;
    }
}