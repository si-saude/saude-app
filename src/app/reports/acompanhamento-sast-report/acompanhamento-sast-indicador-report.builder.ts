import { AcompanhamentoSastIndicadorDto } from './../../model/dto/acompanhamento-sast-indicador-dto';
import { AcompanhamentoSastAcaoReportBuilder } from './acompanhamento-sast-acao-report.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoSastIndicadorReportBuilder extends GenericBuilder {

    initialize(acompanhamentoSastIndicador: AcompanhamentoSastIndicadorDto) {
        acompanhamentoSastIndicador = new AcompanhamentoSastIndicadorDto();
        
        acompanhamentoSastIndicador.setAcoes(new AcompanhamentoSastAcaoReportBuilder().initializeList(null));
                
        return acompanhamentoSastIndicador;
    }
    
    initializeList(acompanhamentoSastIndicadores: Array<AcompanhamentoSastIndicadorDto>) {
        
        let array:Array<AcompanhamentoSastIndicadorDto> = new Array<AcompanhamentoSastIndicadorDto>();
        
        if(acompanhamentoSastIndicadores === null || acompanhamentoSastIndicadores === undefined)
            acompanhamentoSastIndicadores = new Array<AcompanhamentoSastIndicadorDto>();
        
        for (let acompanhamentoSastIndicador of acompanhamentoSastIndicadores) {
            array.push(this.initialize(acompanhamentoSastIndicador));
        }
        
        return array;
    }
    
    clone(acompanhamentoSastIndicador: AcompanhamentoSastIndicadorDto): AcompanhamentoSastIndicadorDto {
        
        if (acompanhamentoSastIndicador === null || acompanhamentoSastIndicador === undefined)
            acompanhamentoSastIndicador = new AcompanhamentoSastIndicadorDto();
        
        let cloneAcompanhamentoSastIndicadorDto = new AcompanhamentoSastIndicadorDto();
        cloneAcompanhamentoSastIndicadorDto.setDiagnostico(this.getValue(acompanhamentoSastIndicador, "getDiagnostico"));
        cloneAcompanhamentoSastIndicadorDto.setIndicador(this.getValue(acompanhamentoSastIndicador, "getIndicador"));
        cloneAcompanhamentoSastIndicadorDto.setIntervencao(this.getValue(acompanhamentoSastIndicador, "getIntervencao"));
        cloneAcompanhamentoSastIndicadorDto.setAcoes(
                new AcompanhamentoSastAcaoReportBuilder().cloneList(
                        this.getValue(acompanhamentoSastIndicador, "getAcoes")));
        
        return cloneAcompanhamentoSastIndicadorDto;
    }
    
    cloneList(acompanhamentoSastIndicadores: Array<AcompanhamentoSastIndicadorDto>): Array<AcompanhamentoSastIndicadorDto> {
        let array:Array<AcompanhamentoSastIndicadorDto> = new Array<AcompanhamentoSastIndicadorDto>();
    
        if (acompanhamentoSastIndicadores !== null && acompanhamentoSastIndicadores !== undefined) { 
            for (let acompanhamentoSastIndicador of acompanhamentoSastIndicadores) {
                array.push(this.clone(acompanhamentoSastIndicador));
            }
        }        
        return array;
    }
}
