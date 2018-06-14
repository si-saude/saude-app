import { Triagem } from './../../model/triagem';

export class PlanejamentoUtil {

    verifyPlanejamento( triagens, idEquipeProfissional ) {
        let ret: boolean = true;
        let innerTriagens: Array<Triagem> = new Array<Triagem>();
        let triagensInvalidas: Array<Triagem> = new Array<Triagem>();

        if ( triagens.length == 0 ) return true;

        innerTriagens = triagens.filter( t => {
            if ( t.getIndice() > -1 ) {
                if ( t.getDiagnostico().getDescricao() == "" || t.getDiagnostico().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getIntervencao().getDescricao() == "" || t.getIntervencao().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getEquipeAbordagem().getNome() == "" || t.getEquipeAbordagem().getNome() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getPrazo() == "" || t.getPrazo() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                }
            }

            return true;
        } )

        if ( innerTriagens.length > 0 ){
            triagensInvalidas.forEach( t => {
                if (t.getIndice() < 3 && (t.getJustificativa() == "" || t.getJustificativa() == undefined) )
                    ret = false;
            } );
            
            if( innerTriagens.find( t => t.getEquipeAbordagem().getId() == idEquipeProfissional )
                    == undefined)
                ret = false;
        }
        else ret = false;

        return ret;
    }
    
}