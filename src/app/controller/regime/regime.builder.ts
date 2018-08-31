import { Regime } from './../../model/regime';
import { GenericBuilder } from './../../generics/generic.builder';

export class RegimeBuilder extends GenericBuilder {

    initialize(regime: Regime) {
        regime = new Regime();
        return regime;
    }
    
    initializeList( regimes: Array<Regime> ) {
        let array: Array<Regime> = new Array<Regime>();

        if ( regimes === null || regimes === undefined )
            regimes = new Array<Regime>();

        for ( let regime of regimes ) {
            array.push( this.initialize( regime ) );
        }

        return array;
    }
    
    clone(regime: Regime): Regime {
        
        if (regime === null || regime === undefined)
            regime = new Regime();
        
        let cloneRegime = new Regime();
        cloneRegime.setId(this.getValue(regime,"getId"));
        cloneRegime.setNome(this.getValue(regime, "getNome"));
        cloneRegime.setVersion(this.getValue(regime, "getVersion"));
        return cloneRegime;
    }
    
    cloneList( regimes: Array<Regime> ): Array<Regime> {
        let array: Array<Regime> = new Array<Regime>();

        if ( regimes !== null && regimes !== undefined ) {
            for ( let regime of regimes ) {
                array.push( this.clone( regime ) );
            }
        }

        return array;
    }
    
}