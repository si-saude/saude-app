import { AvaliacaoFisica } from './avaliacao-fisica';
import { AtividadeFisica } from './atividade-fisica';

export class AvaliacaoFisicaAtividadeFisica {
    private id: number;
    private avaliacaoFisica: AvaliacaoFisica;
    private atividadeFisica: AtividadeFisica;
    private domingo: boolean;
    private segunda: boolean;
    private terca: boolean;
    private quarta: boolean;
    private quinta: boolean;
    private sexta: boolean;
    private sabado: boolean;
    private tipo: string;
    private minuto: number;
    private totalMinuto: number;
    private classificacao: string;
    private observacao: string;
    private version: number;
    
    public getAvaliacaoFisica() {
        return this.avaliacaoFisica;
    }

    public setAvaliacaoFisica(avaliacaoFisica) {
        this.avaliacaoFisica = avaliacaoFisica;
    }

    public getAtividadeFisica() {
        return this.atividadeFisica;
    }

    public setAtividadeFisica(atividadeFisica) {
        this.atividadeFisica = atividadeFisica;
    }

    public getDomingo() {
        return this.domingo;
    }

    public setDomingo(domingo) {
        this.domingo = domingo;
    }

    public getSegunda() {
        return this.segunda;
    }

    public setSegunda(segunda) {
        this.segunda = segunda;
    }

    public getTerca() {
        return this.terca;
    }

    public setTerca(terca) {
        this.terca = terca;
    }

    public getQuarta() {
        return this.quarta;
    }

    public setQuarta(quarta) {
        this.quarta = quarta;
    }

    public getQuinta() {
        return this.quinta;
    }

    public setQuinta(quinta) {
        this.quinta = quinta;
    }

    public getSexta() {
        return this.sexta;
    }

    public setSexta(sexta) {
        this.sexta = sexta;
    }

    public getSabado() {
        return this.sabado;
    }

    public setSabado(sabado) {
        this.sabado = sabado;
    }

    public getTipo() {
        return this.tipo;
    }

    public setTipo(tipo) {
        this.tipo = tipo;
    }

    public getMinuto() {
        return this.minuto;
    }

    public setMinuto(minuto) {
        this.minuto = minuto;
    }

    public getTotalMinuto() {
        return this.totalMinuto;
    }

    public setTotalMinuto(totalMinuto) {
        this.totalMinuto = totalMinuto;
    }

    public getClassificacao() {
        return this.classificacao;
    }

    public setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao) {
        this.observacao = observacao;
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
}
