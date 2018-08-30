import { Localizacao } from './localizacao';
import { Profissional } from './profissional';
import { Empregado } from './empregado'
import { CustomDate } from './../generics/utils/custom-date.util';

export class AvaliacaoHigieneOcupacional {
    private id: number;
    private data: Date;
    private local: Localizacao;
    private tecnico: Profissional; 
    private inicio: Date;
    private fim: Date;
    private empregado: Empregado;
    private brigada: boolean;
    private espacoConfinado: boolean;
    private usoVoluntario: boolean;
    private ensaioVedacao: string;
    private naoBarbeado: boolean;
    private naoUtilizaMascara: boolean;
    private testeSensibilidadeInsatisfatorio: boolean;
    private observacao: string;
    private concordaDescricaoAprhoGhe: boolean;
    private naoConcordaAgentesRiscos: boolean;
    private naoConcordaAtividades: boolean;
    private naoConcordaFrequenciaExposicaoRiscos: boolean;
    private naoConcordaCategoriaRiscos: boolean;
    private motivoAnalisePreliminar: string;
    private version: number;

    private dataCustomDate: CustomDate = new CustomDate(this.data);
    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private fimCustomDate: CustomDate = new CustomDate(this.fim);

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }
    
    getDataCustomDate(){
        return this.data;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomDate(){
        return this.inicio;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }
    
    getFim() {
        this.fim = this.fimCustomDate.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomDate.setApiDate(fim);
        this.fim = fim;
    }
    
    getFimCustomDate(){
        return this.fim;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
    }

    public getLocal() {
        return this.local;
    }

    public setLocal(local: Localizacao) {
        this.local = local;
    }

    public getTecnico() {
        return this.tecnico;
    }

    public setTecnico(tecnico: Profissional) {
        this.tecnico = tecnico;
    }

    public getEmpregado() {
        return this.empregado;
    }

    public setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    public getBrigada() {
        return this.brigada;
    }

    public setBrigada(brigada: boolean) {
        this.brigada = brigada;
    }

    public getEspacoConfinado() {
        return this.espacoConfinado;
    }

    public setEspacoConfinado(espacoConfinado: boolean) {
        this.espacoConfinado = espacoConfinado;
    }

    public getUsoVoluntario() {
        return this.usoVoluntario;
    }

    public setUsoVoluntario(usoVoluntario: boolean) {
        this.usoVoluntario = usoVoluntario;
    }

    public getNaoBarbeado() {
        return this.naoBarbeado;
    }

    public setNaoBarbeado(naoBarbeado: boolean) {
        this.naoBarbeado = naoBarbeado;
    }

    public getNaoUtilizaMascara() {
        return this.naoUtilizaMascara;
    }

    public setNaoUtilizaMascara(naoUtilizaMascara: boolean) {
        this.naoUtilizaMascara = naoUtilizaMascara;
    }

    public getTesteSensibilidadeInsatisfatorio() {
        return this.testeSensibilidadeInsatisfatorio;
    }

    public setEnsaioVedacao(ensaioVedacao: string) {
        this.ensaioVedacao = ensaioVedacao;
    }

    public getEnsaioVedacao() {
        return this.ensaioVedacao;
    }
    
    public setTesteSensibilidadeInsatisfatorio(testeSensibilidadeInsatisfatorio: boolean) {
        this.testeSensibilidadeInsatisfatorio = testeSensibilidadeInsatisfatorio;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao: string) {
        this.observacao = observacao;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version: number) {
        this.version = version;
    }
    
    public getConcordaDescricaoAprhoGhe() {
        return this.concordaDescricaoAprhoGhe;
    }

    public setConcordaDescricaoAprhoGhe(concordaDescricaoAprhoGhe: boolean) {
        this.concordaDescricaoAprhoGhe = concordaDescricaoAprhoGhe;
    }
    
    public getNaoConcordaAgentesRiscos() {
        return this.naoConcordaAgentesRiscos;
    }

    public setNaoConcordaAgentesRiscos(naoConcordaAgentesRiscos: boolean) {
        this.naoConcordaAgentesRiscos = naoConcordaAgentesRiscos;
    }
    
    public getNaoConcordaAtividades() {
        return this.naoConcordaAtividades;
    }

    public setNaoConcordaAtividades(naoConcordaAtividades: boolean) {
        this.naoConcordaAtividades = naoConcordaAtividades;
    }
    
    public getNaoConcordaFrequenciaExposicaoRiscos() {
        return this.naoConcordaFrequenciaExposicaoRiscos;
    }

    public setNaoConcordaFrequenciaExposicaoRiscos(naoConcordaFrequenciaExposicaoRiscos: boolean) {
        this.naoConcordaFrequenciaExposicaoRiscos = naoConcordaFrequenciaExposicaoRiscos;
    }
    
    public getNaoConcordaCategoriaRiscos() {
        return this.naoConcordaCategoriaRiscos;
    }

    public setNaoConcordaCategoriaRiscos(naoConcordaCategoriaRiscos: boolean) {
        this.naoConcordaCategoriaRiscos = naoConcordaCategoriaRiscos;
    }
    
    public getMotivoAnalisePreliminar() {
        return this.motivoAnalisePreliminar;
    }

    public setMotivoAnalisePreliminar(motivoAnalisePreliminar: string) {
        this.motivoAnalisePreliminar = motivoAnalisePreliminar;
    }
        
}