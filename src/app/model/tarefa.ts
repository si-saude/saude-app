import { Servico } from './servico';
import { Empregado } from './empregado';
import { Profissional } from './profissional';
import { Equipe } from './equipe';
import { CustomDate} from './../generics/utils/custom-date.util';
import { CustomTime} from './../generics/utils/custom-time.util';

export class Tarefa {
    private id: number;
    private inicio: Date;
    private fim: Date;
    private atualizacao: Date;
    private servico: Servico;
    private cliente: Empregado;
    private responsavel: Profissional;
    private equipe: Equipe;
    private status: string;
    private version: number;

    private inicioCustomTime: CustomTime = new CustomTime(this.inicio);
    private fimCustomTime: CustomTime = new CustomTime(this.fim);
    private atualizacaoCustomDate: CustomDate = new CustomDate(this.atualizacao);


    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getAtualizacao() {
        this.atualizacao = this.atualizacaoCustomDate.getApiDate();
        return this.atualizacao;
    }
    
    setAtualizacao(atualizacao: Date) {
        this.atualizacaoCustomDate.setApiDate(atualizacao);
        this.atualizacao = atualizacao;
    }
    
    getAtualizacaoCustomDate(){
        return this.atualizacaoCustomDate;
    }
    
    setAtualizacaoCustomDate(atualizacaoCustomDate: CustomDate){
        this.atualizacaoCustomDate = atualizacaoCustomDate;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomTime.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio:Date) {
        this.inicioCustomTime.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomTime(){
        return this.inicioCustomTime;
    }
    
    setInicioCustomTime(inicioCustomTime: CustomTime){
        this.inicioCustomTime = inicioCustomTime;
    }
    
    getFim() {
        this.fim = this.fimCustomTime.getApiDate();
        return this.fim;
    }
    
    setFim(fim:Date) {
        this.fimCustomTime.setApiDate(fim);
        this.fim = fim;
    }
    
    getFimCustomTime(){
        return this.fimCustomTime;
    }
    
    setFimCustomTime(fimCustomTime: CustomTime){
        this.fimCustomTime = fimCustomTime;
    }

    getServico() {
        return this.servico;
    }

    setServico(servico: Servico) {
        this.servico = servico;
    }

    getCliente() {
        return this.cliente;
    }

    setCliente(cliente: Empregado) {
        this.cliente = cliente;
    }

    getResponsavel() {
        return this.responsavel;
    }

    setResponsavel(responsavel: Profissional) {
        this.responsavel = responsavel;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
