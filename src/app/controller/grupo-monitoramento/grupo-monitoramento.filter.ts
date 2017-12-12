import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { TipoGrupoMonitoramentoFilter } from './../tipo-grupo-monitoramento/tipo-grupo-monitoramento.filter';

export class GrupoMonitoramentoFilter extends GenericFilter {
    private nome: string;
    private tipoGrupoMonitoramento: TipoGrupoMonitoramentoFilter;
    private recorrente: BooleanFilter = new BooleanFilter();
    private relatorio: BooleanFilter = new BooleanFilter();
    
    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
    getTipoGrupoMonitoramento() {
        return this.tipoGrupoMonitoramento;
    }
    
    setTipoGrupoMonitoramento(tipoGrupoMonitoramento: TipoGrupoMonitoramentoFilter) {
        this.tipoGrupoMonitoramento = tipoGrupoMonitoramento;
    }
    
    getRecorrente() {
        return this.recorrente;
    }
    
    setRecorrente(recorrente: BooleanFilter) {
        this.recorrente = recorrente;
    }
    
    getRelatorio() {
        return this.relatorio;
    }
    
    setRelatorio(relatorio: BooleanFilter) {
        this.relatorio = relatorio;
    }
       
}