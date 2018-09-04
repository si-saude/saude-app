import { Atestado } from './../../model/atestado';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { CatBuilder } from './../cat/cat.builder';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { HomologacaoAtestadoBuilder } from './../homologacao-atestado/homologacao-atestado.builder';
import { RegimeBuilder } from './../regime/regime.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { MotivoRecusaAtestadoBuilder } from './../motivo-recusa-atestado/motivo-recusa-atestado.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtestadoBuilder extends GenericBuilder {
    
    initialize(atestado: Atestado) {
        atestado = new Atestado();
        
        atestado.setTarefa(new TarefaBuilder().initialize(atestado.getTarefa()));
        atestado.setCat(new CatBuilder().initialize(atestado.getCat()))
        atestado.setProfissionalRealizouVisita(new ProfissionalSaudeBuilder().initialize(atestado.getProfissionalRealizouVisita()));
        atestado.setHomologacaoAtestado(new HomologacaoAtestadoBuilder().initialize(atestado.getHomologacaoAtestado()));
        atestado.setRegime(new RegimeBuilder().initialize(atestado.getRegime()));
        atestado.setEmpregado(new EmpregadoBuilder().initialize(atestado.getEmpregado()));
        atestado.setMotivoRecusa(new MotivoRecusaAtestadoBuilder().initialize(atestado.getMotivoRecusa()));
        
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
        cloneAtestado.setCid(this.getValue(atestado,"getCid"));
        cloneAtestado.setAnexoBase64(this.getValue(atestado,"getAnexoBase64"));
        cloneAtestado.setAnexoRelatorioMedicoBase64(this.getValue(atestado,"getAnexoRelatorioMedicoBase64"));
        cloneAtestado.setAtestadoFisicoRecebido(this.getValue(atestado,"getAtestadoFisicoRecebido"));
        cloneAtestado.setControleLicenca(this.getValue(atestado,"getControleLicenca"));
        cloneAtestado.setDataAgendamento(this.getValue(atestado,"getDataAgendamento"));
        cloneAtestado.setDataSolicitacao(this.getValue(atestado,"getDataSolicitacao"));
        cloneAtestado.setImpossibilidadeLocomocao(this.getValue(atestado,"getImpossibilidadeLocomocao"));
        cloneAtestado.setLancadoSap(this.getValue(atestado,"getLancadoSap"));
        cloneAtestado.setNumeroDias(this.getValue(atestado,"getNumeroDias"));
        cloneAtestado.setStatus(this.getValue(atestado,"getStatus"));
        cloneAtestado.setTipoBeneficio(this.getValue(atestado,"getTipoBeneficio"));
        cloneAtestado.setCausaAfastamento(this.getValue(atestado,"getCausaAfastamento"));
        cloneAtestado.setUltimoContato(this.getValue(atestado,"getUltimoContato"));
        cloneAtestado.setProximoContato(this.getValue(atestado,"getProximoContato"));
        cloneAtestado.setSituacaoEmpregado(this.getValue(atestado,"getSituacaoEmpregado"));
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
        
        cloneAtestado.setTarefa(
                new TarefaBuilder().clone(this.getValue(atestado,"getTarefa")));
        
        cloneAtestado.setEmpregado(
                new EmpregadoBuilder().clone(this.getValue(atestado,"getEmpregado")));
        
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
            if(!this.idGtZero(cloneAtestado.getRegime()))
                cloneAtestado.setRegime(undefined);
        } else {
            cloneAtestado.setRegime(new RegimeBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getProfissionalRealizouVisita") !== undefined) { 
            cloneAtestado.setProfissionalRealizouVisita(
                    new ProfissionalSaudeBuilder().clone(this.getValue(atestado,"getProfissionalRealizouVisita")));
            if(!this.idGtZero(cloneAtestado.getProfissionalRealizouVisita()))
                cloneAtestado.setProfissionalRealizouVisita(undefined);
        } else {
            cloneAtestado.setProfissionalRealizouVisita(new ProfissionalSaudeBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getCat") !== undefined) { 
            cloneAtestado.setCat(
                    new CatBuilder().clone(this.getValue(atestado,"getCat")));
            if(!this.idGtZero(cloneAtestado.getCat()))
                cloneAtestado.setCat(undefined);
        } else {
            cloneAtestado.setCat(new CatBuilder().initialize(null));
        }
        
        if (this.getValue(atestado, "getHomologacaoAtestado") !== undefined) { 
            cloneAtestado.setHomologacaoAtestado(
                    new HomologacaoAtestadoBuilder().clone(this.getValue(atestado,"getHomologacaoAtestado")));
        } else {
            cloneAtestado.setHomologacaoAtestado(undefined);
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