import { Atestado } from './atestado';
import { Profissional } from './profissional';
import { CustomTime } from './../generics/utils/custom-time.util';

export class HomologacaoAtestado {
    private id: number;
    private dataEntrega: Date;
    private dataHomologacao: Date;
    private status: string;
    private observacao: string;
    private atestado: Atestado;
    private profissional: Profissional;
    private version: number;

    private dataEntregaCustomTime: CustomTime = new CustomTime(this.dataEntrega);
    private dataHomologacaoCustomTime: CustomTime = new CustomTime(this.dataHomologacao);
    
    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    getDataEntrega() {
        this.dataEntrega = this.dataEntregaCustomTime.getApiDate();
        return this.dataEntrega;
    }
    
    setDataEntrega(dataEntrega: Date) {
        this.dataEntregaCustomTime.setApiDate(dataEntrega);
        this.dataEntrega = dataEntrega;
    }
    
    getDataEntregaCustomTime(){
        return this.dataEntregaCustomTime;
    }
    
    setDataEntregaCustomTime(dataEntregaCustomTime: CustomTime){
        this.dataEntregaCustomTime = dataEntregaCustomTime;
    }
    
    getDataHomologacao() {
        this.dataHomologacao = this.dataHomologacaoCustomTime.getApiDate();
        return this.dataHomologacao;
    }
    
    setDataHomologacao(dataHomologacao: Date) {
        this.dataHomologacaoCustomTime.setApiDate(dataHomologacao);
        this.dataHomologacao = dataHomologacao;
    }
    
    getDataHomologacaoCustomTime(){
        return this.dataHomologacaoCustomTime;
    }
    
    setDataHomologacaoCustomTime(dataHomologacaoCustomTime: CustomTime){
        this.dataHomologacaoCustomTime = dataHomologacaoCustomTime;
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
