import { EmpregadoConvocacaoExame } from './../../model/empregado-convocacao-exame';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class EmpregadoConvocacaoExameBuilder extends GenericBuilder {

    initialize( empregadoConvocacaoExame: EmpregadoConvocacaoExame ): EmpregadoConvocacaoExame {
        empregadoConvocacaoExame = new EmpregadoConvocacaoExame();

        empregadoConvocacaoExame.setEmpregadoConvocacao( new EmpregadoConvocacao() );
        empregadoConvocacaoExame.setExame( new ExameBuilder().initialize( empregadoConvocacaoExame.getExame() ) );

        return empregadoConvocacaoExame;
    }

    initializeList( empregadoConvocacaoExames: Array<EmpregadoConvocacaoExame> ) {

        let array: Array<EmpregadoConvocacaoExame> = new Array<EmpregadoConvocacaoExame>();

        if ( empregadoConvocacaoExames === null || empregadoConvocacaoExames === undefined )
            empregadoConvocacaoExames = new Array<EmpregadoConvocacaoExame>();

        for ( let empregadoConvocacaoExame of empregadoConvocacaoExames ) {
            array.push( this.initialize( empregadoConvocacaoExame ) );
        }

        return array;
    }

    clone(empregadoConvocacaoExame: EmpregadoConvocacaoExame ): EmpregadoConvocacaoExame {
        let cloneEmpregadoConvocacaoExame = new EmpregadoConvocacaoExame();

        if ( empregadoConvocacaoExame === null || empregadoConvocacaoExame === undefined )
            empregadoConvocacaoExame = new EmpregadoConvocacaoExame();

        cloneEmpregadoConvocacaoExame.setId( this.getValue( empregadoConvocacaoExame, "getId" ) );
        cloneEmpregadoConvocacaoExame.setConforme( this.getValue( empregadoConvocacaoExame, "getConforme" ) );
        cloneEmpregadoConvocacaoExame.setExigeRelatorio(this.getValue( empregadoConvocacaoExame, "getExigeRelatorio" ) );
        cloneEmpregadoConvocacaoExame.setRealizacao(this.getValue( empregadoConvocacaoExame, "getRealizacao" ) );
        cloneEmpregadoConvocacaoExame.setRecebimento(this.getValue( empregadoConvocacaoExame, "getRecebimento" ) );
        cloneEmpregadoConvocacaoExame.setAuditoria(this.getValue( empregadoConvocacaoExame, "getAuditoria" ) );
        cloneEmpregadoConvocacaoExame.setVersion( this.getValue( empregadoConvocacaoExame, "getVersion" ) );

        cloneEmpregadoConvocacaoExame.setEmpregadoConvocacao( new EmpregadoConvocacao() );

        if ( this.getValue( empregadoConvocacaoExame, "getExame" ) !== undefined ) {
            cloneEmpregadoConvocacaoExame.setExame(
                new ExameBuilder().clone( this.getValue( empregadoConvocacaoExame, "getExame" ) ) );
            if ( !this.idGtZero( cloneEmpregadoConvocacaoExame.getExame() ) )
                cloneEmpregadoConvocacaoExame.setExame( undefined );
        } else {
            cloneEmpregadoConvocacaoExame.setExame( new ExameBuilder().initialize( null ) );
        }

        return cloneEmpregadoConvocacaoExame;
    }

    cloneList( empregadoConvocacaoExames: Array<EmpregadoConvocacaoExame> ): Array<EmpregadoConvocacaoExame> {
        let array: Array<EmpregadoConvocacaoExame> = new Array<EmpregadoConvocacaoExame>();

        if ( empregadoConvocacaoExames !== null && empregadoConvocacaoExames !== undefined ) {
            for ( let empregadoConvocacaoExame of empregadoConvocacaoExames ) {
                array.push( this.clone( empregadoConvocacaoExame ) );
            }
        }

        return array;
    }
}