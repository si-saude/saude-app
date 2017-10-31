import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { GenericBuilder } from './../../generics/generic.builder';

export class TipoGrupoMonitoramentoBuilder extends GenericBuilder {

    initialize(tipoGrupoMonitoramento: TipoGrupoMonitoramento) {
        tipoGrupoMonitoramento = new TipoGrupoMonitoramento();
        console.log(tipoGrupoMonitoramento);
        return tipoGrupoMonitoramento;
    }
    
    clone(tipoGrupoMonitoramento: TipoGrupoMonitoramento): TipoGrupoMonitoramento {
        
        if (tipoGrupoMonitoramento === null || tipoGrupoMonitoramento === undefined)
            tipoGrupoMonitoramento = new TipoGrupoMonitoramento();
        
        let cloneTipoGrupoMonitoramento = new TipoGrupoMonitoramento();
        cloneTipoGrupoMonitoramento.setId(this.getValue(tipoGrupoMonitoramento,"getId"));
        cloneTipoGrupoMonitoramento.setNome(this.getValue(tipoGrupoMonitoramento, "getNome"));
        cloneTipoGrupoMonitoramento.setDescricao(this.getValue(tipoGrupoMonitoramento, "getDescricao"));
        cloneTipoGrupoMonitoramento.setVersion(this.getValue(tipoGrupoMonitoramento, "getVersion"));
        
        return cloneTipoGrupoMonitoramento;
    }
    
}