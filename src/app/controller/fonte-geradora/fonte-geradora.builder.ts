import { FonteGeradora } from './../../model/fonte-geradora';
import { GenericBuilder } from './../../generics/generic.builder';

export class FonteGeradoraBuilder extends GenericBuilder {

    initialize(fonteGeradora: FonteGeradora) {
        fonteGeradora = new FonteGeradora();
        return fonteGeradora;
    }
    
    clone(fonteGeradora: FonteGeradora): FonteGeradora {
        
        if (fonteGeradora === null || fonteGeradora === undefined)
            fonteGeradora = new FonteGeradora();
        
        let cloneFonteGeradora = new FonteGeradora();
        cloneFonteGeradora.setId(this.getValue(fonteGeradora,"getId"));
        cloneFonteGeradora.setDescricao(this.getValue(fonteGeradora, "getDescricao"));
        cloneFonteGeradora.setVersion(this.getValue(fonteGeradora, "getVersion"));
        return cloneFonteGeradora;
    }
    
    cloneList( fonteGeradoras: Array<FonteGeradora> ): Array<FonteGeradora> {
        let array: Array<FonteGeradora> = new Array<FonteGeradora>();

        if ( fonteGeradoras !== null && fonteGeradoras !== undefined ) {
            for ( let fonteGeradora of fonteGeradoras ) {
                array.push( this.clone( fonteGeradora ) );
            }
        }
        return array;
    }
}