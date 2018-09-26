import {ProfissionalSaudeBuilder} from './../../controller/profissional-saude/profissional-saude.builder';
import {ProfissionalSaudeFilter} from './../../controller/profissional-saude/profissional-saude.filter';
import {ProfissionalSaudeService} from './../../controller/profissional-saude/profissional-saude.service';
import {Profissional} from './../../model/profissional';
import {PessoaFilter} from './../../controller/pessoa/pessoa.filter';
import {EquipeFilter} from './../equipe/equipe.filter';
import {EmpregadoFilter} from './../../controller/empregado/empregado.filter';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class ProfissionalCatNomeAutocomplete{
    
    private autoComplete:AutoComplete<ProfissionalSaudeFilter>;

    constructor(service:ProfissionalSaudeService) {
        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
        profissionalFilter.setEmpregado(new EmpregadoFilter());
        profissionalFilter.setEquipe(new EquipeFilter());
        profissionalFilter.getEquipe().setAbreviacao("MED");
        profissionalFilter.getEmpregado().setPessoa(new PessoaFilter());
        
        this.autoComplete = new AutoComplete<ProfissionalSaudeFilter>(
                profissionalFilter,
                this,
                service,
                new ProfissionalSaudeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getEmpregado().getChave() + " || " + obj.getEmpregado().getPessoa().getNome();
    }
    
    public getFilter(p:Profissional, pF:ProfissionalSaudeFilter){
        pF.getEmpregado().getPessoa().setNome(p.getEmpregado().getPessoa().getNome());
        return pF;
    }
}