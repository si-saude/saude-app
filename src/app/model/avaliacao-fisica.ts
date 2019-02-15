import { Atendimento } from './atendimento';
import { AvaliacaoFisicaAtividadeFisica } from './avaliacao-fisica-atividade-fisica';

export class AvaliacaoFisica {
    private id: number; 
    private atendimento: Atendimento;
    private estatura: number;
    private peso: number;
    private circunferenciaAbdominal: number;
    private circunferenciaCintura: number;
    private circunferenciaQuadril: number;
    private gorduraNegociada: number;
    private tipo: string;
    private pass: number;
    private pad: number;
    private fcRepouso: number;
    private ipaqAnterior: string;
    private avaliacaoFisicaAtividadeFisicas: Array<AvaliacaoFisicaAtividadeFisica>;
    private praticaExercicioFisico: boolean;
    private interesseProgramaFisico: boolean;
    private acaoIniciarExercicioFisico: boolean;
    private observacaoEstagioContemplacao: string;
    private protocoloComposicaoCorporal: string;
    private imc: number;
    private razaoCinturaEstatura: number;
    private percentualGordura: number;
    private percentualMassaMagra: number;
    private massaMagra: number;
    private gorduraAbsoluta: number;
    private carenciaMuscular: number;
    private percentualGorduraIdeal: number;
    private percentualMassaMagraIdeal: number;
    private pesoIdeal: number;
    private pesoExcesso: number;
    private percentualGorduraNegociada: number;
    private percentualMassaMagraNegociada: number;
    private pesoNegociado: number;
    private pesoExcessoNegociado: number;
    private observacoes: string;
    private aptidaoCardiorrespiratoriaValor: number;
    private aptidaoCardiorrespiratoriaClassificacao: string;
    private aptidaoCardiorrespiratoriaObservacao: string;
    private forcaAbdominalValor: number;
    private forcaAbdominalClassificacao: string;
    private forcaAbdominalObservacao: string;
    private flexibilidadeValor: number;
    private flexibilidadeClassificacao: string;
    private flexibilidadeObservacao: string;
    private forcaPreensaoManualValor: number;
    private forcaPreensaoManualClassificacao: string;
    private forcaPreensaoManualObservacao: string;
    private version: number;
    private dobraTricipital: number;
    private dobraSubscapular: number;
    private dobraToracica: number;
    private dobraAuxiliarMedia: number;
    private dobraSupraIliaca: number;
    private dobraAbdominal: number;
    private dobraCoxaMedial: number;    
    private pressaoArterialSistolica: number;
    private pressaoArterialDiastolica: number;
    private frequenciaCardiaca: number;

    public getAtendimento() {
        return this.atendimento;
    }
    public setAtendimento(atendimento) {
        this.atendimento = atendimento;
    }
    public getTipo() {
        return this.tipo;
    }
    public setTipo(tipo) {
        this.tipo = tipo;
    }
    public getPass() {
        return this.pass;
    }
    public setPass(pass) {
        this.pass = pass;
    }
    public getPad() {
        return this.pad;
    }
    public setPad(pad) {
        this.pad = pad;
    }
    public getFcRepouso() {
        return this.fcRepouso;
    }
    public setFcRepouso(fcRepouso) {
        this.fcRepouso = fcRepouso;
    }
    public getIpaqAnterior() {
        return this.ipaqAnterior;
    }
    public setIpaqAnterior(ipaqAnterior) {
        this.ipaqAnterior = ipaqAnterior;
    }
    public getPraticaExercicioFisico() {
        return this.praticaExercicioFisico;
    }
    public setPraticaExercicioFisico(praticaExercicioFisico) {
        this.praticaExercicioFisico = praticaExercicioFisico;
    }
    public getInteresseProgramaFisico() {
        return this.interesseProgramaFisico;
    }
    public setInteresseProgramaFisico(interesseProgramaFisico) {
        this.interesseProgramaFisico = interesseProgramaFisico;
    }
    public getAcaoIniciarExercicioFisico() {
        return this.acaoIniciarExercicioFisico;
    }
    public setAcaoIniciarExercicioFisico(acaoIniciarExercicioFisico) {
        this.acaoIniciarExercicioFisico = acaoIniciarExercicioFisico;
    }
    public getProtocoloComposicaoCorporal() {
        return this.protocoloComposicaoCorporal;
    }
    public setProtocoloComposicaoCorporal(protocoloComposicaoCorporal) {
        this.protocoloComposicaoCorporal = protocoloComposicaoCorporal;
    }
    public getImc() {
        return this.imc;
    }
    public setImc(imc) {
        this.imc = imc;
    }
    public getRazaoCinturaEstatura() {
        return this.razaoCinturaEstatura;
    }
    public setRazaoCinturaEstatura(razaoCinturaEstatura) {
        this.razaoCinturaEstatura = razaoCinturaEstatura;
    }
    public getPercentualGordura() {
        return this.percentualGordura;
    }
    public setPercentualGordura(percentualGordura) {
        this.percentualGordura = percentualGordura;
    }
    public getPercentualMassaMagra() {
        return this.percentualMassaMagra;
    }
    public setPercentualMassaMagra(percentualMassaMagra) {
        this.percentualMassaMagra = percentualMassaMagra;
    }
    public getMassaMagra() {
        return this.massaMagra;
    }
    public setMassaMagra(massaMagra) {
        this.massaMagra = massaMagra;
    }
    public getGorduraAbsoluta() {
        return this.gorduraAbsoluta;
    }
    public setGorduraAbsoluta(gorduraAbsoluta) {
        this.gorduraAbsoluta = gorduraAbsoluta;
    }
    public getCarenciaMuscular() {
        return this.carenciaMuscular;
    }
    public setCarenciaMuscular(carenciaMuscular) {
        this.carenciaMuscular = carenciaMuscular;
    }
    public getPercentualGorduraIdeal() {
        return this.percentualGorduraIdeal;
    }
    public setPercentualGorduraIdeal(percentualGorduraIdeal) {
        this.percentualGorduraIdeal = percentualGorduraIdeal;
    }
    public getPercentualMassaMagraIdeal() {
        return this.percentualMassaMagraIdeal;
    }
    public setPercentualMassaMagraIdeal(percentualMassaMagraIdeal) {
        this.percentualMassaMagraIdeal = percentualMassaMagraIdeal;
    }
    public getPesoIdeal() {
        return this.pesoIdeal;
    }
    public setPesoIdeal(pesoIdeal) {
        this.pesoIdeal = pesoIdeal;
    }
    public getPesoExcesso() {
        return this.pesoExcesso;
    }
    public setPesoExcesso(pesoExcesso) {
        this.pesoExcesso = pesoExcesso;
    }
    public getPercentualGorduraNegociada() {
        return this.percentualGorduraNegociada;
    }
    public setPercentualGorduraNegociada(percentualGorduraNegociada) {
        this.percentualGorduraNegociada = percentualGorduraNegociada;
    }
    public getPesoNegociado() {
        return this.pesoNegociado;
    }
    public setPesoNegociado(pesoNegociado) {
        this.pesoNegociado = pesoNegociado;
    }
    public getPesoExcessoNegociado() {
        return this.pesoExcessoNegociado;
    }
    public setPesoExcessoNegociado(pesoExcessoNegociado) {
        this.pesoExcessoNegociado = pesoExcessoNegociado;
    }
    public getObservacoes() {
        return this.observacoes;
    }
    public setObservacoes(observacoes) {
        this.observacoes = observacoes;
    }
    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getVersion() {
        return this.version;
    }
    public setVersion(version) {
        this.version = version;
    }
    public getAvaliacaoFisicaAtividadeFisicas() {
        return this.avaliacaoFisicaAtividadeFisicas;
    }
    public setAvaliacaoFisicaAtividadeFisicas(avaliacaoFisicaAtividadeFisicas) {
        this.avaliacaoFisicaAtividadeFisicas = avaliacaoFisicaAtividadeFisicas;
    }
    public getObservacaoEstagioContemplacao() {
        return this.observacaoEstagioContemplacao;
    }
    public setObservacaoEstagioContemplacao(observacaoEstagioContemplacao) {
        this.observacaoEstagioContemplacao = observacaoEstagioContemplacao;
    }
    public getPercentualMassaMagraNegociada() {
        return this.percentualMassaMagraNegociada;
    }
    public setPercentualMassaMagraNegociada(percentualMassaMagraNegociada) {
        this.percentualMassaMagraNegociada = percentualMassaMagraNegociada;
    }
    public getAptidaoCardiorrespiratoriaValor() {
        return this.aptidaoCardiorrespiratoriaValor;
    }
    public setAptidaoCardiorrespiratoriaValor(aptidaoCardiorrespiratoriaValor) {
        this.aptidaoCardiorrespiratoriaValor = aptidaoCardiorrespiratoriaValor;
    }
    public getAptidaoCardiorrespiratoriaClassificacao() {
        return this.aptidaoCardiorrespiratoriaClassificacao;
    }
    public setAptidaoCardiorrespiratoriaClassificacao(aptidaoCardiorrespiratoriaClassificacao) {
        this.aptidaoCardiorrespiratoriaClassificacao = aptidaoCardiorrespiratoriaClassificacao;
    }
    public getAptidaoCardiorrespiratoriaObservacao() {
        return this.aptidaoCardiorrespiratoriaObservacao;
    }
    public setAptidaoCardiorrespiratoriaObservacao(aptidaoCardiorrespiratoriaObservacao) {
        this.aptidaoCardiorrespiratoriaObservacao = aptidaoCardiorrespiratoriaObservacao;
    }
    public getForcaAbdominalValor() {
        return this.forcaAbdominalValor;
    }
    public setForcaAbdominalValor(forcaAbdominalValor) {
        this.forcaAbdominalValor = forcaAbdominalValor;
    }
    public getForcaAbdominalClassificacao() {
        return this.forcaAbdominalClassificacao;
    }
    public setForcaAbdominalClassificacao(forcaAbdominalClassificacao) {
        this.forcaAbdominalClassificacao = forcaAbdominalClassificacao;
    }
    public getForcaAbdominalObservacao() {
        return this.forcaAbdominalObservacao;
    }
    public setForcaAbdominalObservacao(forcaAbdominalObservacao) {
        this.forcaAbdominalObservacao = forcaAbdominalObservacao;
    }
    public getFlexibilidadeValor() {
        return this.flexibilidadeValor;
    }
    public setFlexibilidadeValor(flexibilidadeValor) {
        this.flexibilidadeValor = flexibilidadeValor;
    }
    public getFlexibilidadeClassificacao() {
        return this.flexibilidadeClassificacao;
    }
    public setFlexibilidadeClassificacao(flexibilidadeClassificacao) {
        this.flexibilidadeClassificacao = flexibilidadeClassificacao;
    }
    public getFlexibilidadeObservacao() {
        return this.flexibilidadeObservacao;
    }
    public setFlexibilidadeObservacao(flexibilidadeObservacao) {
        this.flexibilidadeObservacao = flexibilidadeObservacao;
    }
    public getForcaPreensaoManualValor() {
        return this.forcaPreensaoManualValor;
    }
    public setForcaPreensaoManualValor(forcaPreensaoManualValor) {
        this.forcaPreensaoManualValor = forcaPreensaoManualValor;
    }
    public getForcaPreensaoManualClassificacao() {
        return this.forcaPreensaoManualClassificacao;
    }
    public setForcaPreensaoManualClassificacao(forcaPreensaoManualClassificacao) {
        this.forcaPreensaoManualClassificacao = forcaPreensaoManualClassificacao;
    }
    public getForcaPreensaoManualObservacao() {
        return this.forcaPreensaoManualObservacao;
    }
    public setForcaPreensaoManualObservacao(forcaPreensaoManualObservacao) {
        this.forcaPreensaoManualObservacao = forcaPreensaoManualObservacao;
    }
    public getDobraTricipital() {
        return this.dobraTricipital;
    }
    public setDobraTricipital(dobraTricipital) {
        this.dobraTricipital = dobraTricipital;
    }
    public getDobraSubscapular() {
        return this.dobraSubscapular;
    }
    public setDobraSubscapular(dobraSubscapular) {
        this.dobraSubscapular = dobraSubscapular;
    }
    public getDobraToracica() {
        return this.dobraToracica;
    }
    public setDobraToracica(dobraToracica) {
        this.dobraToracica = dobraToracica;
    }
    public getDobraAuxiliarMedia() {
        return this.dobraAuxiliarMedia;
    }
    public setDobraAuxiliarMedia(dobraAuxiliarMedia) {
        this.dobraAuxiliarMedia = dobraAuxiliarMedia;
    }
    public getDobraSupraIliaca() {
        return this.dobraSupraIliaca;
    }
    public setDobraSupraIliaca(dobraSupraIliaca) {
        this.dobraSupraIliaca = dobraSupraIliaca;
    }
    public getDobraAbdominal() {
        return this.dobraAbdominal;
    }
    public setDobraAbdominal(dobraAbdominal) {
        this.dobraAbdominal = dobraAbdominal;
    }
    public getDobraCoxaMedial() {
        return this.dobraCoxaMedial;
    }
    public setDobraCoxaMedial(dobraCoxaMedial) {
        this.dobraCoxaMedial = dobraCoxaMedial;
    }
    public getPressaoArterialSistolica() {
        return this.pressaoArterialSistolica;
    }
    public setPressaoArterialSistolica(pressaoArterialSistolica) {
        this.pressaoArterialSistolica = pressaoArterialSistolica;
    }
    public getPressaoArterialDiastolica() {
        return this.pressaoArterialDiastolica;
    }
    public setPressaoArterialDiastolica(pressaoArterialDiastolica) {
        this.pressaoArterialDiastolica = pressaoArterialDiastolica;
    }
    public getFrequenciaCardiaca() {
        return this.frequenciaCardiaca;
    }
    public setFrequenciaCardiaca(frequenciaCardiaca) {
        this.frequenciaCardiaca = frequenciaCardiaca;
    }   
    
    public getPeso() {
        return  this.peso;
    }
    public setPeso(peso) {
        this.peso = peso;
    }
    public getEstatura() {
        return this.estatura;
    }
    public setEstatura(estatura) {
        this.estatura = estatura;
    }
    public getCircurferenciaAbdominal() {
        return  this.circunferenciaAbdominal;
    }
    public setCircunferenciaAbdominal(circunferenciaAbdominal) {
        this.circunferenciaAbdominal = circunferenciaAbdominal;
    }
    public getCircunferenciaCintura() {
        return  this.circunferenciaCintura;
    }
    public setCircunferenciaCintura(circunferenciaCintura) {
        this.circunferenciaCintura = circunferenciaCintura;
    }
    public getCircunferenciaQuadril() {
        return  this.circunferenciaQuadril;
    }
    public setCircunferenciaQuadril(circunferenciaQuadril) {
        this.circunferenciaQuadril = circunferenciaQuadril;
    }
    public getGorduraNegociada() {
        return this.gorduraNegociada;
    }
    public setGorduraNegociada(gorduraNegociada) {
        this.gorduraNegociada = gorduraNegociada;
    }
}
