import { AcompanhamentoSastDto } from './../../model/dto/acompanhamento-sast-dto';
import { AcaoDto } from './../../model/dto/acao-dto';
import { AcaoDtoBuilder } from './acao-dto.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoSastReportBuilder extends GenericBuilder {

    initialize(acompanhamentoSast: AcompanhamentoSastDto) {
        acompanhamentoSast = new AcompanhamentoSastDto();
        
        acompanhamentoSast.setAcoes(new AcaoDtoBuilder().initialize(undefined));
                
        return acompanhamentoSast;
    }
    
    initializeList(acompanhamentoSasts: Array<AcompanhamentoSastDto>) {
        
        let array:Array<AcompanhamentoSastDto> = new Array<AcompanhamentoSastDto>();
        
        if(acompanhamentoSasts === null || acompanhamentoSasts === undefined)
            acompanhamentoSasts = new Array<AcompanhamentoSastDto>();
        
        for (let acompanhamentoSast of acompanhamentoSasts) {
            array.push(this.initialize(acompanhamentoSast));
        }
        
        return array;
    }
    
    clone(acompanhamentoSast: AcompanhamentoSastDto): AcompanhamentoSastDto {
        
        if (acompanhamentoSast === null || acompanhamentoSast === undefined)
            acompanhamentoSast = new AcompanhamentoSastDto();
        
        let cloneAcompanhamentoSastDto = new AcompanhamentoSastDto();
        cloneAcompanhamentoSastDto.setAcoes(this.getValue(acompanhamentoSast, "getAcoes"));
        cloneAcompanhamentoSastDto.setContatoAcao(this.getValue(acompanhamentoSast, "getContatoAcao"));
        cloneAcompanhamentoSastDto.setDescricaoAcao(this.getValue(acompanhamentoSast, "getDescricaoAcao"));
        cloneAcompanhamentoSastDto.setDescricaoAcompanhamento(this.getValue(acompanhamentoSast, "getDescricaoAcompanhamento"));
        cloneAcompanhamentoSastDto.setDiagnostico(this.getValue(acompanhamentoSast, "getDiagnostico"));
        cloneAcompanhamentoSastDto.setEquipe(this.getValue(acompanhamentoSast, "getEquipe"));
        cloneAcompanhamentoSastDto.setIdAcao(this.getValue(acompanhamentoSast, "getIdAcao"));
        cloneAcompanhamentoSastDto.setIdTriagem(this.getValue(acompanhamentoSast, "getIdTriagem"));
        cloneAcompanhamentoSastDto.setIndicador(this.getValue(acompanhamentoSast, "getIndicador"));
        cloneAcompanhamentoSastDto.setIntervencao(this.getValue(acompanhamentoSast, "getIntervencao"));
        cloneAcompanhamentoSastDto.setMatricula(this.getValue(acompanhamentoSast, "getMatricula"));
        cloneAcompanhamentoSastDto.setNome(this.getValue(acompanhamentoSast, "getNome"));
        cloneAcompanhamentoSastDto.setGerencia(this.getValue(acompanhamentoSast, "getGerencia"));
        cloneAcompanhamentoSastDto.setStatusAcao(this.getValue(acompanhamentoSast, "getStatusAcao"));
        cloneAcompanhamentoSastDto.setStatusRisco(this.getValue(acompanhamentoSast, "getStatusRisco"));
        cloneAcompanhamentoSastDto.setStatusRPSat(this.getValue(acompanhamentoSast, "getStatusRPSat"));
        cloneAcompanhamentoSastDto.setTipoAcao(this.getValue(acompanhamentoSast, "getTipoAcao"));
        
        return cloneAcompanhamentoSastDto;
    }
    
    cloneList(acompanhamentoSasts: Array<AcompanhamentoSastDto>): Array<AcompanhamentoSastDto> {
        let array:Array<AcompanhamentoSastDto> = new Array<AcompanhamentoSastDto>();
    
        if (acompanhamentoSasts !== null && acompanhamentoSasts !== undefined) { 
            for (let acompanhamentoSast of acompanhamentoSasts) {
                array.push(this.clone(acompanhamentoSast));
            }
        }        
        return array;
    }
}
