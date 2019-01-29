export class ControleAtestadoDto {
    private nomeEmpregado: string;
    private matricula: string;
    private gerencia: string;
    private base: string;
    private inicioAtestado: string;
    private fimAtestado: string;
    private numeroDias: number;
    private dataRecebimento: string;
    private dataAgendamento: string;
    
    private prazoRecebimento: number;
    private recebidoNoPrazo: boolean;
    private mesRecebimento: string;
    private dataEntrega: string;
    private dataHomologacao: string;
    
    private prazoHomologacao: number;
    private homologadoNoPrazo: boolean;
    
    private mesHomologacao: string;
    private abreviacaoEquipe: string;
    private tarefaProfissional: string;
    private atestadoFisicoRecebido: boolean;
    private observacao: string;
    private statusAtestado: string;
    private justificativa: string;
    private codigoCid: string;
    
    getNomeEmpregado() {
        return this.nomeEmpregado;
    }
    setNomeEmpregado(nomeEmpregado) {
        this.nomeEmpregado = nomeEmpregado;
    }
    getMatricula() {
        return this.matricula;
    }
    setMatricula(matricula) {
        this.matricula = matricula;
    }
    getGerencia() {
        return this.gerencia;
    }
    setGerencia(gerencia) {
        this.gerencia = gerencia;
    }
    getBase() {
        return this.base;
    }
    setBase(base) {
        this.base = base;
    }
    getInicioAtestado() {
        return this.inicioAtestado;
    }
    setInicioAtestado(inicioAtestado) {
        this.inicioAtestado = inicioAtestado;
    }
    getFimAtestado() {
        return this.fimAtestado;
    }
    setFimAtestado(fimAtestado) {
        this.fimAtestado = fimAtestado;
    }
    getNumeroDias() {
        return this.numeroDias;
    }
    setNumeroDias(numeroDias) {
        this.numeroDias = numeroDias;
    }
    getDataRecebimento() {
        return this.dataRecebimento;
    }
    setDataRecebimento(dataRecebimento) {
        this.dataRecebimento = dataRecebimento;
    }
    getDataAgendamento() {
        return this.dataAgendamento;
    }
    setDataAgendamento(dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }
    getPrazoRecebimento() {
        return this.prazoRecebimento;
    }
    setPrazoRecebimento(prazoRecebimento) {
        this.prazoRecebimento = prazoRecebimento;
    }
    getRecebidoNoPrazo() {
        return this.recebidoNoPrazo;
    }
    setRecebidoNoPrazo(recebidoNoPrazo) {
        this.recebidoNoPrazo = recebidoNoPrazo;
    }
    getMesRecebimento() {
        return this.mesRecebimento;
    }
    setMesRecebimento(mesRecebimento) {
        this.mesRecebimento = mesRecebimento;
    }
    getDataEntrega() {
        return this.dataEntrega;
    }
    setDataEntrega(dataEntrega) {
        this.dataEntrega = dataEntrega;
    }
    getDataHomologacao() {
        return this.dataHomologacao;
    }
    setDataHomologacao(dataHomologacao) {
        this.dataHomologacao = dataHomologacao;
    }
    getPrazoHomologacao() {
        return this.prazoHomologacao;
    }
    setPrazoHomologacao(prazoHomologacao) {
        this.prazoHomologacao = prazoHomologacao;
    }
    getHomologadoNoPrazo() {
        return this.homologadoNoPrazo;
    }
    setHomologadoNoPrazo(homologadoNoPrazo) {
        this.homologadoNoPrazo = homologadoNoPrazo;
    }
    getMesHomologacao() {
        return this.mesHomologacao;
    }
    setMesHomologacao(mesHomologacao) {
        this.mesHomologacao = mesHomologacao;
    }
    getAbreviacaoEquipe() {
        return this.abreviacaoEquipe;
    }
    setAbreviacaoEquipe(abreviacaoEquipe) {
        this.abreviacaoEquipe = abreviacaoEquipe;
    }
    getTarefaProfissional() {
        return this.tarefaProfissional;
    }
    setTarefaProfissional(tarefaProfissional) {
        this.tarefaProfissional = tarefaProfissional;
    }
    getAtestadoFisicoRecebido() {
        return this.atestadoFisicoRecebido;
    }
    setAtestadoFisicoRecebido(atestadoFisicoRecebido) {
        this.atestadoFisicoRecebido = atestadoFisicoRecebido;
    }
    getObservacao() {
        return this.observacao;
    }
    setObservacao(observacao) {
        this.observacao = observacao;
    }
    getStatusAtestado() {
        return this.statusAtestado;
    }
    setStatusAtestado(statusAtestado) {
        this.statusAtestado = statusAtestado;
    }
    getJustificativa() {
        return this.justificativa;
    }
    setJustificativa(justificativa) {
        this.justificativa = justificativa;
    }
    getCodigoCid() {
        return this.codigoCid;
    }
    setCodigoCid(codigoCid) {
        this.codigoCid = codigoCid;
    }
}