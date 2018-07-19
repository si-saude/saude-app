import {InstalacaoBuilder} from './instalacao.builder';
import {InstalacaoFilter} from './instalacao.filter';
import {InstalacaoService} from './instalacao.service';
import {Instalacao} from './../../model/instalacao';

import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class InstalacaoNomeAutocomplete{
    
    private autoComplete:AutoComplete<InstalacaoFilter>;

    constructor(service:InstalacaoService) {
        let instalacaoFilter: InstalacaoFilter = new InstalacaoFilter();
        
        this.autoComplete = new AutoComplete<InstalacaoFilter>(
                instalacaoFilter,
                this,
                service,
                new InstalacaoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(i:Instalacao, iF:InstalacaoFilter){
        iF.setNome(i.getNome());
        return iF;
    }
}