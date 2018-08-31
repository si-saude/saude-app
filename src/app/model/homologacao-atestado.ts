import { Atestado } from './atestado';
import { Profissional } from './profissional';
import { CustomDate } from './../generics/utils/custom-date.util';

export class HomologacaoAtestado {
    private id: number;
    private dataEntrega: Date;
    private dataHomologacao: Date;
    private status: string;
    private observacao: string;
    private atestado: Atestado;
    private profissional: Profissional;
    private version: number;

    private dataEntregaCustomDate: CustomDate = new CustomDate(this.dataEntrega);
    private dataHomologacaoCustomDate: CustomDate = new CustomDate(this.dataHomologacao);
    
    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    getDataEntrega() {
        this.dataEntrega = this.dataEntregaCustomDate.getApiDate();
        return this.dataEntrega;
    }
    
    setDataEntrega(dataEntrega: Date) {
        this.dataEntregaCustomDate.setApiDate(dataEntrega);
        this.dataEntrega = dataEntrega;
    }
    
    getDataEntregaCustomDate(){
        return this.dataEntregaCustomDate;
    }
    
    setDataEntregaCustomDate(dataEntregaCustomDate: CustomDate){
        this.dataEntregaCustomDate = dataEntregaCustomDate;
    }
    
    getDataHomologacao() {
        this.dataHomologacao = this.dataHomologacaoCustomDate.getApiDate();
        return this.dataHomologacao;
    }
    
    setDataHomologacao(dataHomologacao: Date) {
        this.dataHomologacaoCustomDate.setApiDate(dataHomologacao);
        this.dataHomologacao = dataHomologacao;
    }
    
    getDataHomologacaoCustomDate(){
        return this.dataHomologacaoCustomDate;
    }
    
    setDataHomologacaoCustomDate(dataHomologacaoCustomDate: CustomDate){
        this.dataHomologacaoCustomDate = dataHomologacaoCustomDate;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(status) {
        this.status = status;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao) {
        this.observacao = observacao;
    }

    public getAtestado() {
        return this.atestado;
    }

    public setAtestado(atestado) {
        this.atestado = atestado;
    }

    public getProfissional() {
        return this.profissional;
    }

    public setProfissional(profissional) {
        this.profissional = profissional;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
}