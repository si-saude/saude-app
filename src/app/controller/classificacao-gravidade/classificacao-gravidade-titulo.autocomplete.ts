import {ClassificacaoGravidadeBuilder} from './classificacao-gravidade.builder';
import {ClassificacaoGravidadeFilter} from './classificacao-gravidade.filter';
import {ClassificacaoGravidadeService} from './classificacao-gravidade.service';
import {ClassificacaoGravidade} from './../../model/classificacao-gravidade';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class ClassificacaoGravidadeTituloAutocomplete{
    
    private autoComplete:AutoComplete<ClassificacaoGravidadeFilter>;

    constructor(service:ClassificacaoGravidadeService) {
        this.autoComplete = new AutoComplete<ClassificacaoGravidadeFilter>(
                new ClassificacaoGravidadeFilter,
                this,
                service,
                new ClassificacaoGravidadeBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getTitulo();
    }
    
    public getFilter(c:ClassificacaoGravidade, cF:ClassificacaoGravidadeFilter){
        cF.setTitulo(c.getTitulo());
        return cF;
    }
}