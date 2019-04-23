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
        cloneAvaliacaoFisica.setCarenciaMuscular(Util.treatDouble(this.getValue( avaliacaoFisica, "getCarenciaMuscular" )));
        cloneAvaliacaoFisica.setFcRepouso(this.getValue( avaliacaoFisica, "getFcRepouso" ));
        cloneAvaliacaoFisica.setGorduraAbsoluta(Util.treatDouble(this.getValue( avaliacaoFisica, "getGorduraAbsoluta" )));
        cloneAvaliacaoFisica.setImc(Util.treatDouble(this.getValue( avaliacaoFisica, "getImc" )));
        cloneAvaliacaoFisica.setInteresseProgramaFisico(this.getValue( avaliacaoFisica, "getInteresseProgramaFisico" ));
        cloneAvaliacaoFisica.setIpaqAnterior(this.getValue( avaliacaoFisica, "getIpaqAnterior" ));
        cloneAvaliacaoFisica.setMassaMagra(Util.treatDouble(this.getValue( avaliacaoFisica, "getMassaMagra" )));
        cloneAvaliacaoFisica.setObservacoes(this.getValue( avaliacaoFisica, "getObservacoes" ));
        cloneAvaliacaoFisica.setPad(this.getValue( avaliacaoFisica, "getPad" ));
        cloneAvaliacaoFisica.setPass(this.getValue( avaliacaoFisica, "getPass" ));
        cloneAvaliacaoFisica.setPercentualGordura(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualGordura" )));
        cloneAvaliacaoFisica.setPercentualGorduraIdeal(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualGorduraIdeal" )));
        cloneAvaliacaoFisica.setPercentualGorduraNegociada(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualGorduraNegociada" )));
        cloneAvaliacaoFisica.setPercentualMassaMagra(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualMassaMagra" )));
        cloneAvaliacaoFisica.setPercentualMassaMagraIdeal(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualMassaMagraIdeal" )));
        cloneAvaliacaoFisica.setPesoExcesso(Util.treatDouble(this.getValue( avaliacaoFisica, "getPesoExcesso" )));
        cloneAvaliacaoFisica.setPesoExcessoNegociado(Util.treatDouble(this.getValue( avaliacaoFisica, "getPesoExcessoNegociado" )));
        cloneAvaliacaoFisica.setPesoIdeal(Util.treatDouble(this.getValue( avaliacaoFisica, "getPesoIdeal" )));
        cloneAvaliacaoFisica.setPesoNegociado(Util.treatDouble(this.getValue( avaliacaoFisica, "getPesoNegociado" )));
        cloneAvaliacaoFisica.setPraticaExercicioFisico(this.getValue( avaliacaoFisica, "getPraticaExercicioFisico" ));
        cloneAvaliacaoFisica.setProtocoloComposicaoCorporal(this.getValue( avaliacaoFisica, "getProtocoloComposicaoCorporal" ));
        cloneAvaliacaoFisica.setRazaoCinturaEstatura(Util.treatDouble(this.getValue( avaliacaoFisica, "getRazaoCinturaEstatura" )));
        cloneAvaliacaoFisica.setTipo(this.getValue( avaliacaoFisica, "getTipo" ));
        cloneAvaliacaoFisica.setPercentualMassaMagraNegociada(Util.treatDouble(this.getValue( avaliacaoFisica, "getPercentualMassaMagraNegociada" )))
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaValor(Util.treatDouble(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaValor" )));
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaClassificacao(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaClassificacao" ));
        cloneAvaliacaoFisica.setAptidaoCardiorrespiratoriaObservacao(this.getValue( avaliacaoFisica, "getAptidaoCardiorrespiratoriaObservacao" ));
        cloneAvaliacaoFisica.setForcaAbdominalValor(this.getValue( avaliacaoFisica, "getForcaAbdominalValor" ));
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
        cloneAvaliacaoFisica.setPeso(Util.treatDouble(this.getValue( avaliacaoFisica, "getPeso")));
        cloneAvaliacaoFisica.setCircunferenciaCintura(Util.treatDouble(this.getValue( avaliacaoFisica, "getCircunferenciaCintura")));
        cloneAvaliacaoFisica.setEstatura(Util.treatDouble(this.getValue( avaliacaoFisica, "getEstatura")));
        cloneAvaliacaoFisica.setCircunferenciaQuadril(Util.treatDouble(this.getValue( avaliacaoFisica, "getCircunferenciaQuadril")));
        cloneAvaliacaoFisica.setCircunferenciaAbdominal(Util.treatDouble(this.getValue( avaliacaoFisica, "getCircunferenciaAbdominal")));
        cloneAvaliacaoFisica.setGorduraNegociada(Util.treatDouble(this.getValue( avaliacaoFisica, "getGorduraNegociada")));
        
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