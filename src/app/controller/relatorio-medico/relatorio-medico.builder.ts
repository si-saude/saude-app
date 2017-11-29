import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { EmpregadoConvocacaoExameBuilder } from './../empregado-convocacao-exame/empregado-convocacao-exame.builder';
import { RelatorioMedico } from './../../model/relatorio-medico';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RelatorioMedicoBuilder extends GenericBuilder {

    initialize( relatorioMedico: RelatorioMedico ): RelatorioMedico {
        relatorioMedico = new RelatorioMedico();

        relatorioMedico.setEmpregadoConvocacaoExame(
                new EmpregadoConvocacaoExameBuilder().initialize(relatorioMedico.getEmpregadoConvocacaoExame()));
        relatorioMedico.setMedico(new ProfissionalSaudeBuilder().initialize(relatorioMedico.getMedico()));
        
        return relatorioMedico;
    }

    initializeList( relatorioMedicos: Array<RelatorioMedico> ) {

        let array: Array<RelatorioMedico> = new Array<RelatorioMedico>();

        if ( relatorioMedicos === null || relatorioMedicos === undefined )
            relatorioMedicos = new Array<RelatorioMedico>();

        for ( let relatorioMedico of relatorioMedicos ) {
            array.push( this.initialize( relatorioMedico ) );
        }

        return array;
    }

    clone( relatorioMedico: RelatorioMedico ): RelatorioMedico {
        let cloneRelatorioMedico = new RelatorioMedico();

        if ( relatorioMedico === null || relatorioMedico === undefined )
            relatorioMedico = new RelatorioMedico();

        cloneRelatorioMedico.setId( this.getValue( relatorioMedico, "getId" ) );
        cloneRelatorioMedico.setVersion( this.getValue( relatorioMedico, "getVersion" ) );
        cloneRelatorioMedico.setFinalizado(this.getValue( relatorioMedico, "getFinalizado" ) );
        cloneRelatorioMedico.setMedicoPrestador(this.getValue( relatorioMedico, "getMedicoPrestador" ) );
        cloneRelatorioMedico.setQuestionamentos(this.getValue( relatorioMedico, "getQuestionamentos" ) );
        cloneRelatorioMedico.setResumo(this.getValue( relatorioMedico, "getResumo" ) );
        
        cloneRelatorioMedico.setMedico(new ProfissionalSaudeBuilder().clone(
                this.getValue( relatorioMedico, "getMedico" )));
        
        if ( this.getValue( relatorioMedico, "getEmpregadoConvocacaoExame" ) !== undefined ) {
            cloneRelatorioMedico.setEmpregadoConvocacaoExame(
                new EmpregadoConvocacaoExameBuilder().clone( this.getValue( relatorioMedico, "getEmpregadoConvocacaoExame" ) ) );
            if ( !this.idGtZero( cloneRelatorioMedico.getEmpregadoConvocacaoExame() ) )
                cloneRelatorioMedico.setEmpregadoConvocacaoExame( undefined );
        } else {
            cloneRelatorioMedico.setEmpregadoConvocacaoExame( new EmpregadoConvocacaoExameBuilder().initialize( null ) );
        }

        return cloneRelatorioMedico;
    }

    cloneList( relatorioMedicos: Array<RelatorioMedico> ): Array<RelatorioMedico> {
        let array: Array<RelatorioMedico> = new Array<RelatorioMedico>();

        if ( relatorioMedicos !== null && relatorioMedicos !== undefined ) {
            for ( let relatorioMedico of relatorioMedicos ) {
                array.push( this.clone( relatorioMedico ) );
            }
        }

        return array;
    }
}