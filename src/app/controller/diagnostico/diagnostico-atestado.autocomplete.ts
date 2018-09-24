import { DiagnosticoBuilder } from './diagnostico.builder';
import { DiagnosticoFilter } from './diagnostico.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from './../../model/diagnostico';

import { AutoComplete } from './../../generics/utils/autocomplete.util';

export class DiagnosticoAtestadoAutocomplete{
    
    private autoComplete:AutoComplete<DiagnosticoFilter>;

    constructor(service:DiagnosticoService, diagnosticoFilter: DiagnosticoFilter) {
        this.autoComplete = new AutoComplete<DiagnosticoFilter>(
                diagnosticoFilter,
                this,
                service,
                new DiagnosticoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getCodigo();
    }
    
    public getFilter(d:Diagnostico, dF:DiagnosticoFilter){
        dF.setCodigo(d.getCodigo());
        return dF;
    }
}