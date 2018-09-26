import { Atestado } from './../../model/atestado';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { CatBuilder } from './../cat/cat.builder';
import { RegimeBuilder } from './../regime/regime.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { MotivoRecusaAtestadoBuilder } from './../motivo-recusa-atestado/motivo-recusa-atestado.builder';
import { DiagnosticoBuilder } from './../diagnostico/diagnostico.builder';
import { ExameBuilder } from './../exame/exame.builder';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { HistoricoAtestadoBuilder } from './../historico-atestado/historico-atestado.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtestadoBuilder extends GenericBuilder {
    
    initialize(atestado: Atestado) {
        atestado = new Atestado();
        
        atestado.setTarefa(new TarefaBuilder().initialize(atestado.getTarefa()));
        atestado.setRegime(new RegimeBuilder().initialize(atestado.getRegime()));
        atestado.setEmpregado(new EmpregadoBuilder().initialize(atestado.getEmpregado()));
        atestado.setMotivoRecusa(new MotivoRecusaAtestadoBuilder().initialize(atestado.getMotivoRecusa()));
        atestado.setCid(new DiagnosticoBuilder().initialize(atestado.getCid()));
        atestado.setAgendamento(new TarefaBuilder().initialize(atestado.getAgendamento()));
        atestado.setProfissional(new ProfissionalSaudeBuilder().initialize(atestado.getProfissional()));        
        atestado.setHistoricoAtestados(new HistoricoAtestadoBuilder().initializeList(atestado.getHistoricoAtestados()));
        atestado.setExamesConvocacao(new ExameBuilder().cloneList(atestado.getExamesConvocacao()));
        
        return atestado;
    }
    
    initializeList(atestados: Array<Atestado>) {
        
        let array:Array<Atestado> = new Array<Atestado>();
        
        if(atestados === null || atestados === undefined)
            atestados = new Array<Atestado>();
        
        for (let atestado of atestados) {
            array.push(this.initialize(atestado));
        }
        
        return array;
    }
    
    clone(atestado: Atestado): Atestado {
        
        if (atestado === null || atestado === undefined)
            atestado = new Atestado();
        
        let cloneAtestado = new Atestado();
        cloneAtestado.setId(this.getValue(atestado,"getId"));
        cloneAtestado.setVersion(this.getValue(atestado,"getVersion"));
        cloneAtestado.setAnexoBase64(this.getValue(atestado,"getAnexoBase64"));
        cloneAtestado.setAnexoRelatorioMedicoBase64(this.getValue(atestado,"getAnexoRelatorioMedicoBase64"));
        cloneAtestado.setAtestadoFisicoRecebido(this.getValue(atestado,"getAtestadoFisicoRecebido"));
        cloneAtestado.setControleLicenca(this.getValue(atestado,"getControleLicenca"));
        cloneAtestado.setDataSolicitacao(this.getValue(atestado,"getDataSolicitacao"));
        cloneAtestado.setImpossibilidadeLocomocao(this.getValue(atestado,"getImpossibilidadeLocomocao"));
        cloneAtestado.setLancadoSap(this.getValue(atestado,"getLancadoSap"));
        cloneAtestado.setNumeroDias(this.getValue(atestado,"getNumeroDias"));
        cloneAtestado.setStatus(this.getValue(atestado,"getStatus"));
        cloneAtestado.setInicio(this.getValue(atestado,"getInicio"));
        cloneAtestado.setTelefoneExterno(this.treatTelefoneExterno(this.getValue(atestado,"getTelefoneExterno")));
        cloneAtestado.setEmailExterno(this.getValue(atestado,"getEmailExterno"));
        cloneAtestado.setClinica(this.getValue(atestado,"getClinica"));
        cloneAtestado.setContatoMedico(this.getValue(atestado,"getContatoMedico"));
        cloneAtestado.setLocalAtendimento(this.getValue(atestado,"getLocalAtendimento"));
        cloneAtestado.setAposentadoInss(this.getValue(atestado,"getAposentadoInss"));
        cloneAtestado.setPresencial(this.getValue(atestado,"getPresencial"));
        cloneAtestado.setDataInicioEscalaTrabalho(this.getValue(atestado,"getDataInicioEscalaTrabalho"));
        cloneAtestado.setDataFimEscalaTrabalho(this.getValue(atestado,"getDataFimEscalaTrabalho"));
        cloneAtestado.setPossuiFeriasAgendadas(this.getValue(atestado,"getPossuiFeriasAgendadas"));
        cloneAtestado.setDataInicioFerias(this.getValue(atestado,"getDataInicioFerias"));
        cloneAtestado.setDataFimFerias(this.getValue(atestado,"getDataFimFerias"));
        cloneAtestado.setCiente(this.getValue(atestado,"getCiente"));
        cloneAtestado.setLimiteAuditar(this.getValue(atestado,"getLimiteAuditar"));
        cloneAtestado.setLimiteHomologar(this.getValue(atestado,"getLimiteHomologar"));
        cloneAtestado.setLimiteLancar(this.getValue(atestado,"getLimiteLancar"));
        cloneAtestado.setDataLimiteAgendamento(this.getValue(atestado,"getDataLimiteAgendamento"));
        cloneAtestado.setDataLimiteAuditar(this.getValue(atestado,"getDataLimiteAuditar"));
        cloneAtestado.setDataLimiteHomologar(this.getValue(atestado,"getDataLimiteHomologar"));
        cloneAtestado.setDataLimiteLancar(this.getValue(atestado,"getDataLimiteLancar"));
        cloneAtestado.setSomaDiasAtestados(this.getValue(atestado,"getSomaDiasAtestados"));
        cloneAtestado.setConcatenacaoDatasCids(this.getValue(atestado,"getConcatenacaoDatasCids"));
        cloneAtestado.setObservacao(this.getValue(atestado,"getObservacao"));
        cloneAtestado.setLancamentoSd2000(this.getValue(atestado,"getLancamentoSd2000"))
        cloneAtestado.setFim(this.getValue(atestado,"getFim"));
        cloneAtestado.setAusenciaExames(this.getValue(atestado,"getAusenciaExames"));
        cloneAtestado.setPreviewStatus(this.getValue(atestado,"getPreviewStatus"));
        cloneAtestado.setDataAuditoria(this.getValue(atestado,"getDataAuditoria"));
        cloneAtestado.setConvocado(this.getValue(atestado,"getConvocado"));
        cloneAtestado.setDataHomologacao(this.getValue(atestado,"getDataHomologacao"));
        
        if (this.getValue(atestado, "getHistoricoAtestados") !== undefined) { 
            cloneAtestado.setHistoricoAtestados(
                    new HistoricoAtestadoBuilder().cloneList(this.getValue(atestado,"getHistoricoAtestados")));
        } else {
            cloneAtestado.setHistoricoAtestados(new HistoricoAtestadoBuilder().initializeList(null));
        }
        
        if (this.getValue(atestado, "getProfissional") !== undefined) { 
            cloneAtestado.setProfissional(
                    new ProfissionalSaudeBuilder().clone(this.getValue(atestado,"getProfissional")));
            if( !this.idGtZero(cloneAtestado.getProfissional()) )
                cloneAtestado.setProfissional(undefined);
        } else {
            cloneAtestado.setProfissional(new ProfissionalSaudeBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getTarefa") !== undefined) { 
            cloneAtestado.setTarefa(
                new TarefaBuilder().clone(this.getValue(atestado,"getTarefa")));
        } else {
            cloneAtestado.setTarefa(new TarefaBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getEmpregado") !== undefined) { 
            cloneAtestado.setEmpregado(
                    new EmpregadoBuilder().clone(this.getValue(atestado,"getEmpregado")));
            if( !this.idGtZero(cloneAtestado.getEmpregado()) )
                cloneAtestado.setEmpregado(undefined);
        } else {
            cloneAtestado.setEmpregado(new EmpregadoBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getExamesConvocacao") !== undefined) { 
            cloneAtestado.setExamesConvocacao(
                    new ExameBuilder().cloneList(this.getValue(atestado,"getExamesConvocacao")));
        } else {
            cloneAtestado.setExamesConvocacao(new ExameBuilder().initializeList(null));
        }
        
        if (this.getValue(atestado, "getCid") !== undefined) { 
            cloneAtestado.setCid(
                    new DiagnosticoBuilder().clone(this.getValue(atestado,"getCid")));
            if( !this.idGtZero(cloneAtestado.getCid()) )
                cloneAtestado.setCid(undefined);
        } else {
            cloneAtestado.setCid(new DiagnosticoBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getAgendamento") !== undefined) { 
            cloneAtestado.setAgendamento(
                    new TarefaBuilder().clone(this.getValue(atestado,"getAgendamento")));
            if( !this.idGtZero(cloneAtestado.getAgendamento()) )
                cloneAtestado.setAgendamento(undefined);
        } else {
            cloneAtestado.setAgendamento(new TarefaBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getMotivoRecusa") !== undefined) { 
            cloneAtestado.setMotivoRecusa(
                    new MotivoRecusaAtestadoBuilder().clone(this.getValue(atestado,"getMotivoRecusa")));
            if( !this.idGtZero(cloneAtestado.getMotivoRecusa()) )
                cloneAtestado.setMotivoRecusa(undefined);
        } else {
            cloneAtestado.setMotivoRecusa(new MotivoRecusaAtestadoBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getRegime") !== undefined) { 
            cloneAtestado.setRegime(
                    new RegimeBuilder().clone(this.getValue(atestado,"getRegime")));
            if( !this.idGtZero(cloneAtestado.getRegime()) )
                cloneAtestado.setRegime(undefined);
        } else {
            cloneAtestado.setRegime(new RegimeBuilder().initialize(null));
        }
        
        return cloneAtestado;
    }
    
    cloneList(atestados: Array<Atestado>): Array<Atestado> {
        let array:Array<Atestado> = new Array<Atestado>();
    
        if (atestados !== null && atestados !== undefined) { 
            for (let atestado of atestados) {
                array.push(this.clone(atestado));
            }
        }
        
        return array;
    }
    
    treatTelefoneExterno(telefone: string) {
        if ( telefone != undefined )
            return telefone.replace(/\D/g, "");
    }
    
}