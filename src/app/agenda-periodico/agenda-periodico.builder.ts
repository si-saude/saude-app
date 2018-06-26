import { AgendaPeriodicoDto } from './../model/dto/agenda-periodico-dto';
import { GenericBuilder } from './../generics/generic.builder';

export class AgendaPeriodicoBuilder extends GenericBuilder {
    
    initialize(agendaPeriodico: AgendaPeriodicoDto) {
        agendaPeriodico = new AgendaPeriodicoDto();
        return agendaPeriodico;
    }
    
    initializeList(agendaPeriodicos: Array<AgendaPeriodicoDto>) {
        
        let array:Array<AgendaPeriodicoDto> = new Array<AgendaPeriodicoDto>();
        
        if(agendaPeriodicos === null || agendaPeriodicos === undefined)
            agendaPeriodicos = new Array<AgendaPeriodicoDto>();
        
        for (let agendaPeriodico of agendaPeriodicos) {
            array.push(this.initialize(agendaPeriodico));
        }
        
        return array;
    }
    
    clone(agendaPeriodico: AgendaPeriodicoDto): AgendaPeriodicoDto {
        
        if (agendaPeriodico === null || agendaPeriodico === undefined)
            agendaPeriodico = new AgendaPeriodicoDto();
        
        let cloneAgendaPeriodico = new AgendaPeriodicoDto();
        cloneAgendaPeriodico.setEmpregadoId(this.getValue(agendaPeriodico,"getEmpregadoId"));
        cloneAgendaPeriodico.setEmpregadoNome(this.getValue(agendaPeriodico,"getEmpregadoNome"));
        cloneAgendaPeriodico.setStatus(this.getValue(agendaPeriodico,"getStatus"));
        cloneAgendaPeriodico.setData(this.getValue(agendaPeriodico,"getData"));
        cloneAgendaPeriodico.setNomeServico(this.getValue(agendaPeriodico,"getNomeServico"));
        cloneAgendaPeriodico.setPendencias(this.getValue(agendaPeriodico,"getPendencias"));
        
        return cloneAgendaPeriodico;
    }
    
    cloneList(agendaPeriodicos: Array<AgendaPeriodicoDto>): Array<AgendaPeriodicoDto> {
        let array:Array<AgendaPeriodicoDto> = new Array<AgendaPeriodicoDto>();
    
        if (agendaPeriodicos !== null && agendaPeriodicos !== undefined) { 
            for (let agendaPeriodico of agendaPeriodicos) {
                array.push(this.clone(agendaPeriodico));
            }
        }
        
        return array;
    }
    
}