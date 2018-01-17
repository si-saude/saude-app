import { Servico } from './../../model/servico';
import { Atividade } from './../../model/atividade';
import { AtividadeBuilder } from './../atividade/atividade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ServicoBuilder extends GenericBuilder {

    initialize(servico: Servico) {
        servico = new Servico();
        
        servico.setAtividades(new Array<Atividade>());
        
        return servico;
    }
    
    initializeList(servicos: Array<Servico>) {
        
        let array:Array<Servico> = new Array<Servico>();
        
        if(servicos === null || servicos === undefined)
            servicos = new Array<Servico>();
        
        for (let servico of servicos) {
            array.push(this.initialize(servico));
        }
        
        return array;
    }
    
    clone(servico: Servico): Servico {
        
        if (servico === null || servico === undefined)
            servico = new Servico();
        
        let cloneServico = new Servico();
        cloneServico.setId(this.getValue(servico,"getId"));
        cloneServico.setCodigo(this.getValue(servico, "getCodigo"));
        cloneServico.setNome(this.getValue(servico, "getNome"));
        cloneServico.setPublico(this.getValue(servico, "getPublico"));
        cloneServico.setUrl(this.getValue(servico, "getUrl"));
        cloneServico.setIntervalo(this.getValue(servico, "getIntervalo"));
        cloneServico.setQuantidadeSolicitacaoIntervalo(this.getValue(servico, "getQuantidadeSolicitacaoIntervalo"));
        cloneServico.setVersion(this.getValue(servico, "getVersion"));
        
        if(this.getValue(servico, "getGrupo") == "")
            cloneServico.setGrupo(undefined);
        else if (this.getValue(servico, "getGrupo") == undefined)
            cloneServico.setGrupo("");
        else
            cloneServico.setGrupo(this.getValue(servico, "getGrupo"));
        
        cloneServico.setAtividades(this.getValue(servico, "getAtividades"));
        
        cloneServico.setAtividades(
                new AtividadeBuilder().cloneList(this.getValue(servico, "getAtividades")));
        
        return cloneServico;
    }
    
    cloneList(servicos: Array<Servico>): Array<Servico> {
        let array:Array<Servico> = new Array<Servico>();
    
        if (servicos !== null && servicos !== undefined) { 
            for (let servico of servicos) {
                array.push(this.clone(servico));
            }
        }
        
        return array;
    }
}