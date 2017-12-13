import { EmpregadoConvocacaoBuilder } from './../empregado-convocacao/empregado-convocacao.builder';
import { ResultadoExame } from './../../model/resultado-exame';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ResultadoExameBuilder extends GenericBuilder {

    initialize( resultadoExame: ResultadoExame ): ResultadoExame {
        resultadoExame = new ResultadoExame();

        resultadoExame.setEmpregadoConvocacao(
                new EmpregadoConvocacaoBuilder().initialize(resultadoExame.getEmpregadoConvocacao()));
        
        resultadoExame.setExame(new ExameBuilder().initialize(resultadoExame.getExame()));
        
        return resultadoExame;
    }

    initializeList( resultadoExames: Array<ResultadoExame> ) {

        let array: Array<ResultadoExame> = new Array<ResultadoExame>();

        if ( resultadoExames === null || resultadoExames === undefined )
            resultadoExames = new Array<ResultadoExame>();

        for ( let resultadoExame of resultadoExames ) {
            array.push( this.initialize( resultadoExame ) );
        }

        return array;
    }

    clone( resultadoExame: ResultadoExame ): ResultadoExame {
        let cloneResultadoExame = new ResultadoExame();

        if ( resultadoExame === null || resultadoExame === undefined )
            resultadoExame = new ResultadoExame();

        cloneResultadoExame.setId( this.getValue( resultadoExame, "getId" ) );
        cloneResultadoExame.setVersion( this.getValue( resultadoExame, "getVersion" ) );
        cloneResultadoExame.setAcao(this.getValue( resultadoExame, "getAcao" ) );
        cloneResultadoExame.setConforme(this.getValue( resultadoExame, "isConforme" ) );
        cloneResultadoExame.setData(this.getValue( resultadoExame, "getData" ) );
        cloneResultadoExame.setLocal(this.getValue( resultadoExame, "getLocal" ) );
        cloneResultadoExame.setTipo(this.getValue( resultadoExame, "getTipo" ) );
        
        if ( this.getValue( resultadoExame, "getEmpregadoConvocacao" ) !== undefined ) {
            cloneResultadoExame.setEmpregadoConvocacao(
                new EmpregadoConvocacaoBuilder().clone( this.getValue( resultadoExame, "getEmpregadoConvocacao" ) ) );
            if ( !this.idGtZero( cloneResultadoExame.getEmpregadoConvocacao() ) )
                cloneResultadoExame.setEmpregadoConvocacao( undefined );
        } else {
            cloneResultadoExame.setEmpregadoConvocacao( new EmpregadoConvocacaoBuilder().initialize( null ) );
        }
        
        if ( this.getValue( resultadoExame, "getExame" ) !== undefined ) {
            cloneResultadoExame.setExame(
                new ExameBuilder().clone( this.getValue( resultadoExame, "getExame" ) ) );
            if ( !this.idGtZero( cloneResultadoExame.getExame() ) )
                cloneResultadoExame.setExame( undefined );
        } else {
            cloneResultadoExame.setExame( new ExameBuilder().initialize( null ) );
        }

        return cloneResultadoExame;
    }

    cloneList( resultadoExames: Array<ResultadoExame> ): Array<ResultadoExame> {
        let array: Array<ResultadoExame> = new Array<ResultadoExame>();

        if ( resultadoExames !== null && resultadoExames !== undefined ) {
            for ( let resultadoExame of resultadoExames ) {
                array.push( this.clone( resultadoExame ) );
            }
        }

        return array;
    }
}