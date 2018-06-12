import { Profissiograma } from './profissiograma';
import { GerenciaConvocacao } from './gerencia-convocacao';
import { EmpregadoConvocacao } from './empregado-convocacao';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Convocacao {
    private id: number;
    private titulo: string;
    private tipo: string = "";
    private profissiograma: Profissiograma;
    private gerenciaConvocacoes: Array<GerenciaConvocacao>;
    private empregadoConvocacoes: Array<EmpregadoConvocacao>;
    private inicio: Date;
    private fim: Date;
    private version: number;
    
    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private fimCustomDate: CustomDate = new CustomDate(this.fim);

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }
    
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    
    getTipo() {
        return this.tipo;
    }
    
    setTipo(tipo: string) {
        this.tipo = tipo;
    }
    
    getProfissiograma() {
        return this.profissiograma;
    }
    
    setProfissiograma(profissiograma: Profissiograma) {
        this.profissiograma = profissiograma;
    }
    
    getGerenciaConvocacoes() {
        return this.gerenciaConvocacoes;
    }
    
    setGerenciaConvocacoes(gerenciaConvocacoes: Array<GerenciaConvocacao>) {
        this.gerenciaConvocacoes = gerenciaConvocacoes;
    }
    
    getEmpregadoConvocacoes() {
        return this.empregadoConvocacoes;
    }
    
    setEmpregadoConvocacoes(empregadoConvocacoes: Array<EmpregadoConvocacao>) {
        this.empregadoConvocacoes = empregadoConvocacoes;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getFim() {
        this.fim = this.fimCustomDate.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomDate.setApiDate(fim);
        this.fim = fim;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getInicioCustomDate(){
        return this.inicioCustomDate;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }
    
    getFimCustomDate(){
        return this.fimCustomDate;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
    }
    
}
