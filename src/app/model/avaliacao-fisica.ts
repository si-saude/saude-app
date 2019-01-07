import { Atendimento } from './atendimento';
import { AvaliacaoFisicaAtividadeFisica } from './avaliacao-fisica-atividade-fisica';

export class AvaliacaoFisica {
    private id: number;
    private atendimento: Atendimento;
    private tipoAtendimento: string;
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
    
    public getAtendimento() {
        return this.atendimento;
    }
    public setAtendimento(atendimento) {
        this.atendimento = atendimento;
    }
    public getTipoAtendimento() {
        return this.tipoAtendimento;
    }
    public setTipoAtendimento(tipoAtendimento) {
        this.tipoAtendimento = tipoAtendimento;
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
}