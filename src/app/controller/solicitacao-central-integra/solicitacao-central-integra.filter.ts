import { TipoSolicitacaoFilter } from './../tipo-solicitacao/tipo-solicitacao.filter';
import { DateFilter } from './../../generics/date.filter';
import { GenericFilter } from './../../generics/generic.filter';
 
export class SolicitacaoCentralIntegraFilter extends GenericFilter { 
    private tipoSolicitacao: TipoSolicitacaoFilter;
    private status: string;
    private abertura: DateFilter;
    private prazo: DateFilter;
    
    getTipoSolicitacao() {
        return this.tipoSolicitacao;
    }
    setTipoSolicitacao(tipoSolicitacao: TipoSolicitacaoFilter) {
        this.tipoSolicitacao = tipoSolicitacao;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getAbertura() {
        return this.abertura;
    }
    setAbertura(abertura: DateFilter) {
        this.abertura = abertura;
    }
    getPrazo() {
        return this.prazo;
    }
    setPrazo(prazo: DateFilter) {
        this.prazo = prazo;
    }
    
}
