export class AtestadoDto {
    private id: number;
    private nomeEmpregado: string;
    private cid: string;

    private matricula: string;
    private gerencia: string;
    private base: string;

    private prazoRecebimento: number;
    private recebidoNoPrazo: boolean;
    private mesRecebimento: string;
    private fim: string;

    private numeroDias: number;
    private inicio: string;
    private impossibilidadeLocomocao: boolean;
    private status: string;
    private lancadoSap: boolean;
    private atestadoFisicoRecebido: boolean;
    private controleLicenca: boolean;
    private dataSolicitacao: string;
    private dataAgendamento: string;
    private numeroCat: string;

    private dataHomologacao: string;
    private dataEntrega: string;
    private prazoHomologacao: number;
    private homologacaoNoPrazo: boolean;
    private mesHomologacao: string;
    private medicoOdonto: string;
    private nomeProfissionalHomologacao: string;
    private observacao: string;

    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getNomeEmpregado() {
        return this.nomeEmpregado;
    }
    public setNomeEmpregado(nomeEmpregado) {
        this.nomeEmpregado = nomeEmpregado;
    }
    public getCid() {
        return this.cid;
    }
    public setCid(cid) {
        this.cid = cid;
    }
    public getNumeroDias() {
        return this.numeroDias;
    }
    public setNumeroDias(numeroDias) {
        this.numeroDias = numeroDias;
    }
    public getInicio() {
        return this.inicio;
    }
    public setInicio(inicio) {
        this.inicio = inicio;
    }
    public getImpossibilidadeLocomocao() {
        return this.impossibilidadeLocomocao;
    }
    public setImpossibilidadeLocomocao(impossibilidadeLocomocao) {
        this.impossibilidadeLocomocao = impossibilidadeLocomocao;
    }
    public getStatus() {
        return this.status;
    }
    public setStatus(status) {
        this.status = status;
    }
    public getLancadoSap() {
        return this.lancadoSap;
    }
    public setLancadoSap(lancadoSap) {
        this.lancadoSap = lancadoSap;
    }
    public getAtestadoFisicoRecebido() {
        return this.atestadoFisicoRecebido;
    }
    public setAtestadoFisicoRecebido(atestadoFisicoRecebido) {
        this.atestadoFisicoRecebido = atestadoFisicoRecebido;
    }
    public getControleLicenca() {
        return this.controleLicenca;
    }
    public setControleLicenca(controleLicenca) {
        this.controleLicenca = controleLicenca;
    }
    public getDataSolicitacao() {
        return this.dataSolicitacao;
    }
    public setDataSolicitacao(dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }
    public getDataAgendamento() {
        return this.dataAgendamento;
    }
    public setDataAgendamento(dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }
    public getNumeroCat() {
        return this.numeroCat;
    }
    public setNumeroCat(numeroCat) {
        this.numeroCat = numeroCat;
    }
    
    public getMatricula() {
        return this.matricula;
    }
    public setMatricula(matricula) {
        this.matricula = matricula;
    }
    public getGerencia() {
        return this.gerencia;
    }
    public setGerencia(gerencia) {
        this.gerencia = gerencia;
    }
    public getBase() {
        return this.base;
    }
    public setBase(base) {
        this.base = base;
    }
    
    public getPrazoRecebimento() {
        return this.prazoRecebimento;
    }
    public setPrazoRecebimento(prazoRecebimento) {
        this.prazoRecebimento = prazoRecebimento;
    }
    public getRecebidoNoPrazo() {
        return this.recebidoNoPrazo;
    }
    public setRecebidoNoPrazo(recebidoNoPrazo) {
        this.recebidoNoPrazo = recebidoNoPrazo;
    }
    public getMesRecebimento() {
        return this.mesRecebimento;
    }
    public setMesRecebimento(mesRecebimento) {
        this.mesRecebimento = mesRecebimento;
    }
    public getFim() {
        return this.fim;
    }
    public setFim(fim) {
        this.fim = fim;
    }
    
    public getDataHomologacao() {
        return this.dataHomologacao;
    }
    public setDataHomologacao(dataHomologacao) {
        this.dataHomologacao = dataHomologacao;
    }
    public getDataEntrega() {
        return this.dataEntrega;
    }
    public setDataEntrega(dataEntrega) {
        this.dataEntrega = dataEntrega;
    }
    public getPrazoHomologacao() {
        return this.prazoHomologacao;
    }
    public setPrazoHomologacao(prazoHomologacao) {
        this.prazoHomologacao = prazoHomologacao;
    }
    public getHomologacaoNoPrazo() {
        return this.homologacaoNoPrazo;
    }
    public setHomologacaoNoPrazo(homologacaoNoPrazo) {
        this.homologacaoNoPrazo = homologacaoNoPrazo;
    }
    public getMesHomologacao() {
        return this.mesHomologacao;
    }
    public setMesHomologacao(mesHomologacao) {
        this.mesHomologacao = mesHomologacao;
    }
    public getMedicoOdonto() {
        return this.medicoOdonto;
    }
    public setMedicoOdonto(medicoOdonto) {
        this.medicoOdonto = medicoOdonto;
    }
    public getNomeProfissionalHomologacao() {
        return this.nomeProfissionalHomologacao;
    }
    public setNomeProfissionalHomologacao(nomeProfissionalHomologacao) {
        this.nomeProfissionalHomologacao = nomeProfissionalHomologacao;
    }
    public getObservacao() {
        return this.observacao;
    }
    public setObservacao(observacao) {
        this.observacao = observacao;
    }
}
