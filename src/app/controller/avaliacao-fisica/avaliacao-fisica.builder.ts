import { AvaliacaoFisica } from './../../model/avaliacao-fisica';
import { Atendimento } from './../../model/atendimento';
import { AvaliacaoFisicaAtividadeFisica } from './../../model/avaliacao-fisica-atividade-fisica';
import { AvaliacaoFisicaAtividadeFisicaBuilder } from './../avaliacao-fisica-atividade-fisica/avaliacao-fisica-atividade-fisica.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

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
        cloneAvaliacaoFisica.setCarenciaMuscular(this.getValue( avaliacaoFisica, "getCarenciaMuscular" ));
        cloneAvaliacaoFisica.setFcRepouso(this.getValue( avaliacaoFisica, "getFcRepouso" ));
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
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaValor(Util.treatDouble(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaValor" )));
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaClassificacao(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaClassificacao" ));
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaObservacao(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaObservacao" ));
        cloneAvaliacaoFisica.setForcaAbdominalValor(Util.treatDouble(this.getValue( avaliacaoFisica, "getForcaAbdominalValor" )));
        cloneAvaliacaoFisica.setForcaAbdominalClassificacao(this.getValue( avaliacaoFisica, "getForcaAbdominalClassificacao" ));
        cloneAvaliacaoFisica.setForcaAbdominalObservacao(this.getValue( avaliacaoFisica, "getForcaAbdominalObservacao" ));
        cloneAvaliacaoFisica.setFlexibilidadeValor(Util.treatDouble(this.getValue( avaliacaoFisica, "getFlexibilidadeValor" )));
        cloneAvaliacaoFisica.setFlexibilidadeClassificacao(this.getValue( avaliacaoFisica, "getFlexibilidadeClassificacao" ));
        cloneAvaliacaoFisica.setFlexibilidadeObservacao(this.getValue( avaliacaoFisica, "getFlexibilidadeObservacao" ));
        cloneAvaliacaoFisica.setForcaPreensaoManualValor(Util.treatDouble(this.getValue( avaliacaoFisica, "getForcaPreensaoManualValor" )));
        cloneAvaliacaoFisica.setForcaPreensaoManualClassificacao(this.getValue( avaliacaoFisica, "getForcaPreensaoManualClassificacao" ));
        cloneAvaliacaoFisica.setForcaPreensaoManualObservacao(this.getValue( avaliacaoFisica, "getForcaPreensaoManualObservacao" ));
        cloneAvaliacaoFisica.setDobraTricipital(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraTricipital" )));
        cloneAvaliacaoFisica.setDobraSubscapular(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraSubscapular" )));
        cloneAvaliacaoFisica.setDobraToracica(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraToracica" )));
        cloneAvaliacaoFisica.setDobraAuxiliarMedia(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraAuxiliarMedia" )));
        cloneAvaliacaoFisica.setDobraSupraIliaca(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraSupraIliaca" )));
        cloneAvaliacaoFisica.setDobraAbdominal(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraAbdominal" )));
        cloneAvaliacaoFisica.setDobraCoxaMedial(Util.treatDouble(this.getValue( avaliacaoFisica, "getDobraCoxaMedial" )));
        cloneAvaliacaoFisica.setPressaoArterialSistolica(Util.treatDouble(this.getValue( avaliacaoFisica, "getPressaoArterialSistolica")));
        cloneAvaliacaoFisica.setPressaoArterialDiastolica(Util.treatDouble(this.getValue( avaliacaoFisica, "getPressaoArterialDiastolica")));
        cloneAvaliacaoFisica.setFrequenciaCardiaca(Util.treatDouble(this.getValue( avaliacaoFisica, "getFrequenciaCardiaca")));
        
        cloneAvaliacaoFisica.setAtendimento(new Atendimento());
        
        cloneAvaliacaoFisica.setAvaliacaoFisicaAtividadeFisicas(
                new AvaliacaoFisicaAtividadeFisicaBuilder().cloneList(
                        this.getValue( avaliacaoFisica, "getAvaliacaoFisicaAtividadeFisicas" )) );
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