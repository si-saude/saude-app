import { AcaoDto } from './../../model/dto/acao-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcaoDtoBuilder extends GenericBuilder {

    initialize(acao: AcaoDto) {
        acao = new AcaoDto();
                
        return acao;
    }
    
    initializeList(acoes: Array<AcaoDto>) {
        
        let array:Array<AcaoDto> = new Array<AcaoDto>();
        
        if(acoes === null || acoes === undefined)
            acoes = new Array<AcaoDto>();
        
        for (let acao of acoes) {
            array.push(this.initialize(acao));
        }
        
        return array;
    }
    
    clone(acao: AcaoDto): AcaoDto {
        
        if (acao === null || acao === undefined)
            acao = new AcaoDto();
        
        let cloneAcaoDto = new AcaoDto();
        cloneAcaoDto.setDescricao(this.getValue(acao, "getDescricao"));
        cloneAcaoDto.setAcompanhamentos(this.getValue(acao, "getAcompanhamentos"));
        cloneAcaoDto.setContatoAcao(this.getValue(acao, "getContatoAcao"));
        cloneAcaoDto.setTipoAcao(this.getValue(acao, "getTipoAcao"));
        
        return cloneAcaoDto;
    }
    
    cloneList(acoes: Array<AcaoDto>): Array<AcaoDto> {
        let array:Array<AcaoDto> = new Array<AcaoDto>();
    
        if (acoes !== null && acoes !== undefined) { 
            for (let acao of acoes) {
                array.push(this.clone(acao));
            }
        }        
        return array;
    }
}
