import { Localizacao } from './../../model/localizacao';
import { GenericBuilder } from './../../generics/generic.builder';

export class LocalizacaoBuilder extends GenericBuilder {
    
    initialize(localizacao: Localizacao) {
        localizacao = new Localizacao();
        return localizacao;
    }
    
    clone(localizacao: Localizacao) {
        
        if (localizacao === null || localizacao === undefined)
            localizacao = new Localizacao();
        
        let cloneLocalizacao = new Localizacao();
        cloneLocalizacao.setId(this.getValue(localizacao,"getId"));
        cloneLocalizacao.setVersion(this.getValue(localizacao,"getVersion"));
        cloneLocalizacao.setNome(this.getValue(localizacao,"getNome"));
        
        return cloneLocalizacao;
    }
}