import { AtestadoDto } from './../../model/dto/atestado-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtestadoBuilder extends GenericBuilder {

    initialize(atestado: AtestadoDto) {
        atestado = new AtestadoDto();
                
        return atestado;
    }
    
    initializeList(atestados: Array<AtestadoDto>) {
        
        let array:Array<AtestadoDto> = new Array<AtestadoDto>();
        
        if(atestados === null || atestados === undefined)
            atestados = new Array<AtestadoDto>();
        
        for (let atestado of atestados) {
            array.push(this.initialize(atestado));
        }
        
        return array;
    }
    
    clone(atestado: AtestadoDto): AtestadoDto {
        
        if (atestado === null || atestado === undefined)
            atestado = new AtestadoDto();
        
        let cloneAtestadoDto = new AtestadoDto();
        cloneAtestadoDto.setAtestadoFisicoRecebido(this.getValue(atestado, "getAtestadoFisicoRecebido"));
        cloneAtestadoDto.setCid(this.getValue(atestado, "getCid"));
        cloneAtestadoDto.setControleLicenca(this.getValue(atestado, "getControleLicenca"));
        cloneAtestadoDto.setDataAgendamento(this.getValue(atestado, "getDataAgendamento"));
        cloneAtestadoDto.setDataSolicitacao(this.getValue(atestado, "getDataSolicitacao"));
        cloneAtestadoDto.setId(this.getValue(atestado, "getId"));
        cloneAtestadoDto.setImpossibilidadeLocomocao(this.getValue(atestado, "getImpossibilidadeLocomocao"));
        cloneAtestadoDto.setInicio(this.getValue(atestado, "getInicio"));
        cloneAtestadoDto.setLancadoSap(this.getValue(atestado, "getLancadoSap"));
        cloneAtestadoDto.setNomeEmpregado(this.getValue(atestado, "getNomeEmpregado"));
        cloneAtestadoDto.setNumeroCat(this.getValue(atestado, "getNumeroCat"));
        cloneAtestadoDto.setNumeroDias(this.getValue(atestado, "getNumeroDias"));
        cloneAtestadoDto.setStatus(this.getValue(atestado, "getStatus"));
                
        return cloneAtestadoDto;
    }
    
    cloneList(atestados: Array<AtestadoDto>): Array<AtestadoDto> {
        let array:Array<AtestadoDto> = new Array<AtestadoDto>();
    
        if (atestados !== null && atestados !== undefined) { 
            for (let atestado of atestados) {
                array.push(this.clone(atestado));
            }
        }        
        return array;
    }
}
