import { SugestaoAgendamentoDto } from './../../model/dto/sugestao-agendamento-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class SugestaoAgendamentoReportBuilder extends GenericBuilder {

    initialize(sugestaoAgendamento: SugestaoAgendamentoDto) {
        sugestaoAgendamento = new SugestaoAgendamentoDto();
        
        return sugestaoAgendamento;
    }
    
    initializeList(sugestaoAgendamentos: Array<SugestaoAgendamentoDto>) {
        
        let array:Array<SugestaoAgendamentoDto> = new Array<SugestaoAgendamentoDto>();
        
        if(sugestaoAgendamentos === null || sugestaoAgendamentos === undefined)
            sugestaoAgendamentos = new Array<SugestaoAgendamentoDto>();
        
        for (let sugestaoAgendamento of sugestaoAgendamentos) {
            array.push(this.initialize(sugestaoAgendamento));
        }
        
        return array;
    }
    
    clone(sugestaoAgendamento: SugestaoAgendamentoDto): SugestaoAgendamentoDto {
        
        if (sugestaoAgendamento === null || sugestaoAgendamento === undefined)
            sugestaoAgendamento = new SugestaoAgendamentoDto();
        
        let cloneSugestaoAgendamentoDto = new SugestaoAgendamentoDto();
        cloneSugestaoAgendamentoDto.setGerencia(this.getValue(sugestaoAgendamento, "getGerencia"));
        cloneSugestaoAgendamentoDto.setNome(this.getValue(sugestaoAgendamento, "getNome"));
        cloneSugestaoAgendamentoDto.setMatricula(this.getValue(sugestaoAgendamento, "getMatricula"));
        cloneSugestaoAgendamentoDto.setData(this.getValue(sugestaoAgendamento, "getData"));
        cloneSugestaoAgendamentoDto.setValidade(this.getValue(sugestaoAgendamento, "getValidade"));
        cloneSugestaoAgendamentoDto.setSugestao(this.getValue(sugestaoAgendamento, "getSugestao"));
        
        return cloneSugestaoAgendamentoDto;
    }
    
    cloneList(sugestaoAgendamentos: Array<SugestaoAgendamentoDto>): Array<SugestaoAgendamentoDto> {
        let array:Array<SugestaoAgendamentoDto> = new Array<SugestaoAgendamentoDto>();
    
        if (sugestaoAgendamentos !== null && sugestaoAgendamentos !== undefined) { 
            for (let sugestaoAgendamento of sugestaoAgendamentos) {
                array.push(this.clone(sugestaoAgendamento));
            }
        }        
        return array;
    }
}
