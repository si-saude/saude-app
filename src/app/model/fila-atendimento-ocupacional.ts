import { Profissional } from './profissional';
import { Localizacao } from './localizacao';
import { FilaAtendimentoOcupacionalAtualizacao } from './fila-atendimento-ocupacional-atualizacao';
import { CustomDate} from './../generics/utils/custom-date.util';

export class FilaAtendimentoOcupacional {
    private id: number;
    private profissional: Profissional;
    private localizacao: Localizacao;
    private inicio: Date;
    private atualizacao: Date;
    private fim: Date;
    private status: string;
    private atualizacoes: Array<FilaAtendimentoOcupacionalAtualizacao>;
    private version: number;

    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }

    getLocalizacao() {
        return this.localizacao;
    }

    setLocalizacao(localizacao: Localizacao) {
        this.localizacao = localizacao;
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
    
    getAtualizacao() {
        return this.atualizacao;
    }

    setAtualizacao(atualizacao: Date) {
        this.atualizacao = atualizacao;
    }

    getFim() {
        return this.fim;
    }

    setFim(fim: Date) {
        this.fim = fim;
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

    getAtualizacoes() {
        return this.atualizacoes;
    }

    setAtualizacoes(atualizacoes: Array<FilaAtendimentoOcupacionalAtualizacao>) {
        this.atualizacoes = atualizacoes;
    }
    
}
