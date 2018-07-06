import { Gerencia } from './../../model/gerencia';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { PessoaBuilder } from './../pessoa/pessoa.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GerenciaBuilder extends GenericBuilder {

    initialize( gerencia: Gerencia ) {
        gerencia = new Gerencia();

        gerencia.setGerencia( new Gerencia() );
        gerencia.setGerente( new Empregado() );
        gerencia.getGerente().setPessoa(new PessoaBuilder().initialize(gerencia.getGerente().getPessoa()));
        gerencia.setSecretario1( new Empregado() );
        gerencia.getSecretario1().setPessoa(new PessoaBuilder().initialize(gerencia.getGerente().getPessoa()));
        gerencia.setSecretario2( new Empregado() );
        gerencia.getSecretario2().setPessoa(new PessoaBuilder().initialize(gerencia.getGerente().getPessoa()));

        return gerencia;
    }

    clone( gerencia: Gerencia ): Gerencia {

        if ( gerencia === null || gerencia === undefined )
            gerencia = new Gerencia();

        let cloneGerencia = new Gerencia();
        cloneGerencia.setId( this.getValue( gerencia, "getId" ) );
        cloneGerencia.setVersion( this.getValue( gerencia, "getVersion" ) );
        cloneGerencia.setCodigo( this.getValue( gerencia, "getCodigo" ) );
        cloneGerencia.setCodigoCompleto( this.getValue( gerencia, "getCodigoCompleto" ) );
        cloneGerencia.setDescricao( this.getValue( gerencia, "getDescricao" ) );
        cloneGerencia.setAusentePeriodico( this.getValue( gerencia, "getAusentePeriodico" ) );

        if ( this.getValue( gerencia, "getGerencia" ) !== undefined ) {
            cloneGerencia.setGerencia(
                new GerenciaBuilder().clone( this.getValue( gerencia, "getGerencia" ) ) );
            if ( !this.idGtZero( cloneGerencia.getGerencia() ) )
                cloneGerencia.setGerencia( undefined );
        } else {
            cloneGerencia.setGerencia( new GerenciaBuilder().initialize( null ) );
        }

        if ( this.getValue( gerencia, "getGerente" ) !== undefined ) {
            cloneGerencia.setGerente(
                new EmpregadoBuilder().clone( this.getValue( gerencia, "getGerente" ) ) );
            if ( !this.idGtZero( cloneGerencia.getGerente() ) )
                cloneGerencia.setGerente( undefined );
        } else {
            cloneGerencia.setGerente( new EmpregadoBuilder().initialize( null ) );
        }

        if ( this.getValue( gerencia, "getSecretario1" ) !== undefined ) {
            cloneGerencia.setSecretario1(
                new EmpregadoBuilder().clone( this.getValue( gerencia, "getSecretario1" ) ) );
            if ( !this.idGtZero( cloneGerencia.getSecretario1() ) )
                cloneGerencia.setSecretario1( undefined );
        } else {
            cloneGerencia.setSecretario1( new EmpregadoBuilder().initialize( null ) );
        }

        if ( this.getValue( gerencia, "getSecretario2" ) !== undefined ) {
            cloneGerencia.setSecretario2(
                new EmpregadoBuilder().clone( this.getValue( gerencia, "getSecretario2" ) ) );
            if ( !this.idGtZero( cloneGerencia.getSecretario2() ) )
                cloneGerencia.setSecretario2( undefined );
        } else {
            cloneGerencia.setSecretario2( new EmpregadoBuilder().initialize( null ) );
        }

        return cloneGerencia;
    }
    
    cloneList(gerencias: Array<Gerencia>): Array<Gerencia> {
        let array:Array<Gerencia> = new Array<Gerencia>();
    
        if (gerencias !== null && gerencias !== undefined) { 
            for (let gerencia of gerencias) {
                array.push(this.clone(gerencia));
            }
        }
        
        return array;
    }

}