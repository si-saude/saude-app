import { AgenteCausador } from '../../model/agente-causador';
import { GenericBuilder } from '../../generics/generic.builder';

export class AgenteCausadorBuilder extends GenericBuilder {

    initialize(agenteCausador: AgenteCausador) {
        agenteCausador = new AgenteCausador();
        return agenteCausador;
    }
    
    initializeList(agenteCausadores: Array<AgenteCausador>) {
        
        let array:Array<AgenteCausador> = new Array<AgenteCausador>();
        
        if(agenteCausadores === null || agenteCausadores === undefined)
            agenteCausadores = new Array<AgenteCausador>();
        
        for (let agenteCausador of agenteCausadores) {
            array.push(this.initialize(agenteCausador));
        }
        
        return array;
    }
    
    clone(agenteCausador: AgenteCausador): AgenteCausador {
        
        if (agenteCausador === null || agenteCausador === undefined)
            agenteCausador = new AgenteCausador();
        
        let cloneAgenteCausador = new AgenteCausador();
        cloneAgenteCausador.setId(this.getValue(agenteCausador,"getId"));
        cloneAgenteCausador.setCodigo(this.getValue(agenteCausador, "getCodigo"));
        cloneAgenteCausador.setDescricao(this.getValue(agenteCausador, "getDescricao"));
        cloneAgenteCausador.setVersion(this.getValue(agenteCausador, "getVersion"));
        return cloneAgenteCausador;
    }
    
    cloneList(agenteCausadores: Array<AgenteCausador>): Array<AgenteCausador> {
        let array:Array<AgenteCausador> = new Array<AgenteCausador>();
    
        if (agenteCausadores !== null && agenteCausadores !== undefined) { 
            for (let agenteCausador of agenteCausadores) {
                array.push(this.clone(agenteCausador));
            }
        }
        
        return array;
    }
    
}