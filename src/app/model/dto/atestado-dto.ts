export class AtestadoDto {
    private id: number;
    private nomeEmpregado: string;
    private cid: string;
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
}
