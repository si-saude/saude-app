import { Servico } from './servico';
import { Empregado } from './empregado';
import { Profissional } from './profissional';
import { Equipe } from './equipe';
import { CustomDate} from './../generics/utils/custom-date.util';

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

    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private fimCustomDate: CustomDate = new CustomDate(this.fim);
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
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomDate(){
        return this.inicioCustomDate;
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
        return this.fimCustomDate;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
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
