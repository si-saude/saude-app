import { Localizacao } from './localizacao';
import { Profissional } from './profissional';
import { Empregado } from './empregado';
import { CustomTime } from './../generics/utils/custom-time.util';
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
    private version: number;

    private dataCustomDate: CustomDate = new CustomDate(this.data);
    private inicioCustomTime: CustomTime = new CustomTime(this.inicio);
    private fimCustomTime: CustomTime = new CustomTime(this.fim);

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
        this.inicio = this.inicioCustomTime.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomTime.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomTime(){
        return this.inicio;
    }
    
    setInicioCustomTime(inicioCustomTime: CustomTime){
        this.inicioCustomTime = inicioCustomTime;
    }
    
    getFim() {
        this.fim = this.fimCustomTime.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomTime.setApiDate(fim);
        this.fim = fim;
    }
    
    getFimCustomTime(){
        return this.fim;
    }
    
    setFimCustomTime(fimCustomTime: CustomTime){
        this.fimCustomTime = fimCustomTime;
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
    
}
