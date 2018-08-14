import { PreRequisitosAgendamentoDto } from './../../model/dto/pre-requisitos-agendamento-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class PreRequisitosAgendamentoReportBuilder extends GenericBuilder {
    
    initialize(preRequisitosAgendamentoDto: PreRequisitosAgendamentoDto) {
        preRequisitosAgendamentoDto = new PreRequisitosAgendamentoDto();
        
        return preRequisitosAgendamentoDto;
    }
    
    initializeList(preRequisitosAgendamentoDtos: Array<PreRequisitosAgendamentoDto>) {
        
        let array:Array<PreRequisitosAgendamentoDto> = new Array<PreRequisitosAgendamentoDto>();
        
        if(preRequisitosAgendamentoDtos === null || preRequisitosAgendamentoDtos === undefined)
            preRequisitosAgendamentoDtos = new Array<PreRequisitosAgendamentoDto>();
        
        for (let preRequisitosAgendamentoDto of preRequisitosAgendamentoDtos) {
            array.push(this.initialize(preRequisitosAgendamentoDto));
        }
        
        return array;
    }
    
    clone(preRequisitosAgendamentoDto: PreRequisitosAgendamentoDto): PreRequisitosAgendamentoDto {
        
        if (preRequisitosAgendamentoDto === null || preRequisitosAgendamentoDto === undefined)
            preRequisitosAgendamentoDto = new PreRequisitosAgendamentoDto();
        
        let clonePreRequisitosAgendamentoDto = new PreRequisitosAgendamentoDto();
        
        clonePreRequisitosAgendamentoDto.setAgendado(this.getValue(preRequisitosAgendamentoDto,"getAgendado"));
        clonePreRequisitosAgendamentoDto.setBase(this.getValue(preRequisitosAgendamentoDto,"getBase"));
        clonePreRequisitosAgendamentoDto.setChave(this.getValue(preRequisitosAgendamentoDto,"getChave"));
        clonePreRequisitosAgendamentoDto.setDatasPreclinico(this.getValue(preRequisitosAgendamentoDto,"getDatasPreclinico"));
        clonePreRequisitosAgendamentoDto.setExamesPendentes(this.getValue(preRequisitosAgendamentoDto,"getExamesPendentes"));
        clonePreRequisitosAgendamentoDto.setGerencia(this.getValue(preRequisitosAgendamentoDto,"getGerencia"));
        clonePreRequisitosAgendamentoDto.setMatricula(this.getValue(preRequisitosAgendamentoDto,"getMatricula"));
        clonePreRequisitosAgendamentoDto.setNome(this.getValue(preRequisitosAgendamentoDto,"getNome"));
        clonePreRequisitosAgendamentoDto.setResultadoAuditado(this.getValue(preRequisitosAgendamentoDto,"getResultadoAuditado"));
        clonePreRequisitosAgendamentoDto.setStatusPreclinico(this.getValue(preRequisitosAgendamentoDto,"getStatusPreclinico"));
        clonePreRequisitosAgendamentoDto.setTitulo(this.getValue(preRequisitosAgendamentoDto,"getTitulo"));
        
        return clonePreRequisitosAgendamentoDto;
    }
    
    cloneList(preRequisitosAgendamentoDtos: Array<PreRequisitosAgendamentoDto>): Array<PreRequisitosAgendamentoDto> {
        let array:Array<PreRequisitosAgendamentoDto> = new Array<PreRequisitosAgendamentoDto>();
    
        if (preRequisitosAgendamentoDtos !== null && preRequisitosAgendamentoDtos !== undefined) {    
            for (let preRequisitosAgendamentoDto of preRequisitosAgendamentoDtos) {
                array.push(this.clone(preRequisitosAgendamentoDto));
            }
        }
        
        return array;
    }
    
}