import { Gerencia } from './../../model/gerencia';
import { GenericBuilder } from './../../generics/generic.builder';

export class GerenciaBuilder extends GenericBuilder {

    initialize(gerencia: Gerencia) {
        gerencia = new Gerencia();
        
        gerencia.setGerencia(new Gerencia());
        
        return gerencia;
    }
    
    clone(gerencia: Gerencia): Gerencia {
        
        if (gerencia === null || gerencia === undefined)
            gerencia = new Gerencia();
        
        let cloneGerencia = new Gerencia();
        cloneGerencia.setId(this.getValue(gerencia,"getId"));
        cloneGerencia.setVersion(this.getValue(gerencia, "getVersion"));
        cloneGerencia.setCodigo(this.getValue(gerencia,"getCodigo"));
        cloneGerencia.setCodigoCompleto(this.getValue(gerencia,"getCodigoCompleto"));
        cloneGerencia.setDescricao(this.getValue(gerencia,"getDescricao"));
        
        if ( this.getValue(gerencia,"getGerencia") !== undefined && 
                gerencia.getGerencia() !== null ) {
            cloneGerencia.setGerencia(
                    new GerenciaBuilder().clone(this.getValue(gerencia,"getGerencia")));
        }
        
        return cloneGerencia;
    }
    
}