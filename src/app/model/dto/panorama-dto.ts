export class PanoramaDto {
    private id: number;
    private gerencia: string;
    private matricula: string;
    private nome: string;
    private mesConvocacao: string;
    private base: string;
    private dataAsoAnoAnterior: string;
    private dataAsoAnoAtual: string;
    private dataRealizacaoPreClinico: string;
    private situacaoAso: string;
    private asoNoPrazo: string;
    private pendencias: string;
    private gerenciaPrimeiraLinha: string;
    private statusPreClinico: string;
    private examesPendentes: string;
    
    getId() {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getGerencia() {
        return this.gerencia;
    }
    setGerencia(gerencia: string) {
        this.gerencia = gerencia;
    }
    getMatricula() {
        return this.matricula;
    }
    setMatricula(matricula: string) {
        this.matricula = matricula;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome: string) {
        this.nome = nome;
    }
    getBase() {
        return this.base;
    }
    setBase(base: string) {
        this.base = base;
    }
    getDataAsoAnoAnterior() {
        return this.dataAsoAnoAnterior;
    }
    setDataAsoAnoAnterior(dataAsoAnoAnterior: string) {
        this.dataAsoAnoAnterior = dataAsoAnoAnterior;
    }
    getDataAsoAnoAtual() {
        return this.dataAsoAnoAtual;
    }
    setDataAsoAnoAtual(dataAsoAnoAtual: string) {
        this.dataAsoAnoAtual = dataAsoAnoAtual;
    }
    getDataRealizacaoPreClinico() {
        return this.dataRealizacaoPreClinico;
    }
    setDataRealizacaoPreClinico(dataRealizacaoPreClinico: string) {
        this.dataRealizacaoPreClinico = dataRealizacaoPreClinico;
    }
    getSituacaoAso() {
        return this.situacaoAso;
    }
    setSituacaoAso(situacaoAso: string) {
        this.situacaoAso = situacaoAso;
    }
    getGerenciaPrimeiraLinha() {
        return this.gerenciaPrimeiraLinha;
    }
    setGerenciaPrimeiraLinha(gerenciaPrimeiraLinha: string) {
        this.gerenciaPrimeiraLinha = gerenciaPrimeiraLinha;
    }
    getMesConvocacao() {
        return this.mesConvocacao;
    }
    setMesConvocacao(mesConvocacao: string) {
        this.mesConvocacao = mesConvocacao;
    }
    getAsoNoPrazo() {
        return this.asoNoPrazo;
    }
    setAsoNoPrazo(asoNoPrazo: string) {
        this.asoNoPrazo = asoNoPrazo;
    }
    getPendencias() {
        return this.pendencias;
    }
    setPendencias(pendencias: string) {
        this.pendencias = pendencias;
    }
    getStatusPreClinico() {
        return this.statusPreClinico;
    }
    setStatusPreClinico(statusPreClinico: string) {
        this.statusPreClinico = statusPreClinico;
    }
    getExamesPendentes() {
        return this.examesPendentes;
    }
    setExamesPendentes(examesPendentes: string) {
        this.examesPendentes = examesPendentes;
    }
    
}
