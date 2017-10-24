import { GenericFilter } from './../../generics/generic.filter';
import { TipoGrupoMonitoramentoFilter } from './../tipo-grupo-monitoramento/tipo-grupo-monitoramento.filter';

export class GrupoMonitoramentoFilter extends GenericFilter {
    private nome: string;
    private tipoGrupoMonitoramento: TipoGrupoMonitoramentoFilter;
    
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
       
}