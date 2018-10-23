import { AcompanhamentoSastAcaoDto } from './../../model/dto/acompanhamento-sast-acao-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoSastAcaoReportBuilder extends GenericBuilder {

    initialize(acompanhamentoSastAcao: AcompanhamentoSastAcaoDto) {
        acompanhamentoSastAcao = new AcompanhamentoSastAcaoDto();
        
        acompanhamentoSastAcao.setAcompanhamentos(new Array<string>());
                
        return acompanhamentoSastAcao;
    }
    
    initializeList(acompanhamentoSastAcoes: Array<AcompanhamentoSastAcaoDto>) {
        
        let array:Array<AcompanhamentoSastAcaoDto> = new Array<AcompanhamentoSastAcaoDto>();
        
        if(acompanhamentoSastAcoes === null || acompanhamentoSastAcoes === undefined)
            acompanhamentoSastAcoes = new Array<AcompanhamentoSastAcaoDto>();
        
        for (let acompanhamentoSastAcao of acompanhamentoSastAcoes) {
            array.push(this.initialize(acompanhamentoSastAcao));
        }
        
        return array;
    }
    
    clone(acompanhamentoSastAcao: AcompanhamentoSastAcaoDto): AcompanhamentoSastAcaoDto {
        
        if (acompanhamentoSastAcao === null || acompanhamentoSastAcao === undefined)
            acompanhamentoSastAcao = new AcompanhamentoSastAcaoDto();
        
        let cloneAcompanhamentoSastAcaoDto = new AcompanhamentoSastAcaoDto();
        cloneAcompanhamentoSastAcaoDto.setAcao(this.getValue(acompanhamentoSastAcao, "getAcao"));
        cloneAcompanhamentoSastAcaoDto.setContatoAcao(this.getValue(acompanhamentoSastAcao, "getContatoAcao"));
        cloneAcompanhamentoSastAcaoDto.setStatusAcao(this.getValue(acompanhamentoSastAcao, "getStatusAcao"));
        cloneAcompanhamentoSastAcaoDto.setTipoAcao(this.getValue(acompanhamentoSastAcao, "getTipoAcao"));
        cloneAcompanhamentoSastAcaoDto.setAcompanhamentos(this.getValue(acompanhamentoSastAcao, "getAcompanhamentos"));
        
        return cloneAcompanhamentoSastAcaoDto;
    }
    
    cloneList(acompanhamentoSastAcoes: Array<AcompanhamentoSastAcaoDto>): Array<AcompanhamentoSastAcaoDto> {
        let array:Array<AcompanhamentoSastAcaoDto> = new Array<AcompanhamentoSastAcaoDto>();
    
        if (acompanhamentoSastAcoes !== null && acompanhamentoSastAcoes !== undefined) { 
            for (let acompanhamentoSastAcao of acompanhamentoSastAcoes) {
                array.push(this.clone(acompanhamentoSastAcao));
            }
        }        
        return array;
    }
}
