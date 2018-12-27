import { AvaliacaoFisica } from './../../model/avaliacao-fisica';
import { Atendimento } from './../../model/atendimento';
import { AvaliacaoFisicaAtividadeFisica } from './../../model/avaliacao-fisica-atividade-fisica';
import { AvaliacaoFisicaAtividadeFisicaBuilder } from './../avaliacao-fisica-atividade-fisica/avaliacao-fisica-atividade-fisica.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AvaliacaoFisicaBuilder extends GenericBuilder {
    
    initialize( avaliacaoFisica: AvaliacaoFisica ) {
        avaliacaoFisica = new AvaliacaoFisica();
        avaliacaoFisica.setAtendimento(new Atendimento());
        avaliacaoFisica.setAvaliacaoFisicaAtividadeFisicas(new AvaliacaoFisicaAtividadeFisicaBuilder().initializeList(null));
        return avaliacaoFisica;
    }
    
    initializeList( avaliacaoFisicas: Array<AvaliacaoFisica> ) {

        let array: Array<AvaliacaoFisica> = new Array<AvaliacaoFisica>();

        if ( avaliacaoFisicas === null || avaliacaoFisicas === undefined )
            avaliacaoFisicas = new Array<AvaliacaoFisica>();

        for ( let avaliacaoFisica of avaliacaoFisicas ) {
            array.push( this.initialize( avaliacaoFisica ) );
        }

        return array;
    }
    
    clone( avaliacaoFisica: AvaliacaoFisica ): AvaliacaoFisica {

        if ( avaliacaoFisica === null || avaliacaoFisica === undefined )
            avaliacaoFisica = new AvaliacaoFisica();
        
        let cloneAvaliacaoFisica = new AvaliacaoFisica();
        cloneAvaliacaoFisica.setId(this.getValue( avaliacaoFisica, "getId" ));
        cloneAvaliacaoFisica.setVersion(this.getValue( avaliacaoFisica, "getVersion" ));
        cloneAvaliacaoFisica.setAcaoIniciarExercicioFisico(this.getValue( avaliacaoFisica, "getAcaoIniciarExercicioFisico" ));
        cloneAvaliacaoFisica.setObservacaoEstagioContemplacao(this.getValue( avaliacaoFisica, "getObservacaoEstagioContemplacao" ));
        cloneAvaliacaoFisica.setAptidaoCardiorespiratoria(this.getValue( avaliacaoFisica, "getAptidaoCardiorespiratoria" ));
        cloneAvaliacaoFisica.setCarenciaMuscular(this.getValue( avaliacaoFisica, "getCarenciaMuscular" ));
        cloneAvaliacaoFisica.setFcRepouso(this.getValue( avaliacaoFisica, "getFcRepouso" ));
        cloneAvaliacaoFisica.setFlexibilidade(this.getValue( avaliacaoFisica, "getFlexibilidade" ));
        cloneAvaliacaoFisica.setForcaAbdominal(this.getValue( avaliacaoFisica, "getForcaAbdominal" ));
        cloneAvaliacaoFisica.setForcaPreensaoManual(this.getValue( avaliacaoFisica, "getForcaPreensaoManual" ));
        cloneAvaliacaoFisica.setGorduraAbsoluta(this.getValue( avaliacaoFisica, "getGorduraAbsoluta" ));
        cloneAvaliacaoFisica.setImc(this.getValue( avaliacaoFisica, "getImc" ));
        cloneAvaliacaoFisica.setInteresseProgramaFisico(this.getValue( avaliacaoFisica, "getInteresseProgramaFisico" ));
        cloneAvaliacaoFisica.setIpaqAnterior(this.getValue( avaliacaoFisica, "getIpaqAnterior" ));
        cloneAvaliacaoFisica.setMassaMagra(this.getValue( avaliacaoFisica, "getMassaMagra" ));
        cloneAvaliacaoFisica.setObservacoes(this.getValue( avaliacaoFisica, "getObservacoes" ));
        cloneAvaliacaoFisica.setPad(this.getValue( avaliacaoFisica, "getPad" ));
        cloneAvaliacaoFisica.setPass(this.getValue( avaliacaoFisica, "getPass" ));
        cloneAvaliacaoFisica.setPercentualGordura(this.getValue( avaliacaoFisica, "getPercentualGordura" ));
        cloneAvaliacaoFisica.setPercentualGorduraIdeal(this.getValue( avaliacaoFisica, "getPercentualGorduraIdeal" ));
        cloneAvaliacaoFisica.setPercentualGorduraNegociada(this.getValue( avaliacaoFisica, "getPercentualGorduraNegociada" ));
        cloneAvaliacaoFisica.setPercentualMassaMagra(this.getValue( avaliacaoFisica, "getPercentualMassaMagra" ));
        cloneAvaliacaoFisica.setPercentualMassaMagraIdeal(this.getValue( avaliacaoFisica, "getPercentualMassaMagraIdeal" ));
        cloneAvaliacaoFisica.setPesoExcesso(this.getValue( avaliacaoFisica, "getPesoExcesso" ));
        cloneAvaliacaoFisica.setPesoExcessoNegociado(this.getValue( avaliacaoFisica, "getPesoExcessoNegociado" ));
        cloneAvaliacaoFisica.setPesoIdeal(this.getValue( avaliacaoFisica, "getPesoIdeal" ));
        cloneAvaliacaoFisica.setPesoNegociado(this.getValue( avaliacaoFisica, "getPesoNegociado" ));
        cloneAvaliacaoFisica.setPraticaExercicioFisico(this.getValue( avaliacaoFisica, "getPraticaExercicioFisico" ));
        cloneAvaliacaoFisica.setProtocoloComposicaoCorporal(this.getValue( avaliacaoFisica, "getProtocoloComposicaoCorporal" ));
        cloneAvaliacaoFisica.setRazaoCinturaEstatura(this.getValue( avaliacaoFisica, "getRazaoCinturaEstatura" ));
        cloneAvaliacaoFisica.setTipoAtendimento(this.getValue( avaliacaoFisica, "getTipoAtendimento" ));
        cloneAvaliacaoFisica.setPercentualMassaMagraNegociada(this.getValue( avaliacaoFisica, "getPercentualMassaMagraNegociada" ))
        
        cloneAvaliacaoFisica.setAtendimento(new Atendimento());
        cloneAvaliacaoFisica.setAvaliacaoFisicaAtividadeFisicas(
                new AvaliacaoFisicaAtividadeFisicaBuilder().cloneList(
                        this.getValue( avaliacaoFisica, "getAvaliacaoFisicaAtividadeFisicas" )));
        
        return cloneAvaliacaoFisica;
    }
    
    cloneList(avaliacaoFisicas: Array<AvaliacaoFisica>): Array<AvaliacaoFisica> {
        let array:Array<AvaliacaoFisica> = new Array<AvaliacaoFisica>();
    
        if (avaliacaoFisicas !== null && avaliacaoFisicas !== undefined) { 
            for (let avaliacaoFisica of avaliacaoFisicas) {
                array.push(this.clone(avaliacaoFisica));
            }
        }
        
        return array;
    }
    
}