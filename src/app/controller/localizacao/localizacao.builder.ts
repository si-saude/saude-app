import { Localizacao } from './../../model/localizacao';
import { GenericBuilder } from './../../generics/generic.builder';

export class LocalizacaoBuilder extends GenericBuilder {

    initialize( localizacao: Localizacao ) {
        localizacao = new Localizacao();
        return localizacao;
    }

    initializeList( localizacoes: Array<Localizacao> ) {

        let array: Array<Localizacao> = new Array<Localizacao>();

        if ( localizacoes === null || localizacoes === undefined )
            localizacoes = new Array<Localizacao>();

        for ( let localizacao of localizacoes ) {
            array.push( this.initialize( localizacao ) );
        }

        return array;
    }

    clone( localizacao: Localizacao ) {

        if ( localizacao === null || localizacao === undefined )
            localizacao = new Localizacao();

        let cloneLocalizacao = new Localizacao();
        cloneLocalizacao.setId( this.getValue( localizacao, "getId" ) );
        cloneLocalizacao.setVersion( this.getValue( localizacao, "getVersion" ) );
        cloneLocalizacao.setNome( this.getValue( localizacao, "getNome" ) );

        return cloneLocalizacao;
    }

    cloneList( localizacoes: Array<Localizacao> ): Array<Localizacao> {
        let array: Array<Localizacao> = new Array<Localizacao>();

        if ( localizacoes !== null && localizacoes !== undefined ) {
            for ( let localizacao of localizacoes ) {
                array.push( this.clone( localizacao ) );
            }
        }

        return array;
    }
}