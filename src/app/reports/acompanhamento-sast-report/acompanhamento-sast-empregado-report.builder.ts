import { AcompanhamentoSastEmpregadoDto } from './../../model/dto/acompanhamento-sast-empregado-dto';
import { AcompanhamentoSastEquipeReportBuilder } from './acompanhamento-sast-equipe-report.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoSastEmpregadoReportBuilder extends GenericBuilder {

    initialize(acompanhamentoSastEmpregado: AcompanhamentoSastEmpregadoDto) {
        acompanhamentoSastEmpregado = new AcompanhamentoSastEmpregadoDto();
        
        acompanhamentoSastEmpregado.setEquipes(new AcompanhamentoSastEquipeReportBuilder().initializeList(null));
                
        return acompanhamentoSastEmpregado;
    }
    
    initializeList(acompanhamentoSastEmpregados: Array<AcompanhamentoSastEmpregadoDto>) {
        
        let array:Array<AcompanhamentoSastEmpregadoDto> = new Array<AcompanhamentoSastEmpregadoDto>();
        
        if(acompanhamentoSastEmpregados === null || acompanhamentoSastEmpregados === undefined)
            acompanhamentoSastEmpregados = new Array<AcompanhamentoSastEmpregadoDto>();
        
        for (let acompanhamentoSastEmpregado of acompanhamentoSastEmpregados) {
            array.push(this.initialize(acompanhamentoSastEmpregado));
        }
        
        return array;
    }
    
    clone(acompanhamentoSastEmpregado: AcompanhamentoSastEmpregadoDto): AcompanhamentoSastEmpregadoDto {
        
        if (acompanhamentoSastEmpregado === null || acompanhamentoSastEmpregado === undefined)
            acompanhamentoSastEmpregado = new AcompanhamentoSastEmpregadoDto();
        
        let cloneAcompanhamentoSastEmpregadoDto = new AcompanhamentoSastEmpregadoDto();
        cloneAcompanhamentoSastEmpregadoDto.setGerencia(this.getValue(acompanhamentoSastEmpregado, "getGerencia"));
        cloneAcompanhamentoSastEmpregadoDto.setMatricula(this.getValue(acompanhamentoSastEmpregado, "getMatricula"));
        cloneAcompanhamentoSastEmpregadoDto.setNome(this.getValue(acompanhamentoSastEmpregado, "getNome"));
        cloneAcompanhamentoSastEmpregadoDto.setStatusRisco(this.getValue(acompanhamentoSastEmpregado, "getStatusRisco"));
        cloneAcompanhamentoSastEmpregadoDto.setStatusRPSat(this.getValue(acompanhamentoSastEmpregado, "getStatusRPSat"));
        cloneAcompanhamentoSastEmpregadoDto.setEquipes(
                new AcompanhamentoSastEquipeReportBuilder().cloneList(
                        this.getValue(acompanhamentoSastEmpregado, "getEquipes")));
        
        return cloneAcompanhamentoSastEmpregadoDto;
    }
    
    cloneList(acompanhamentoSastEmpregados: Array<AcompanhamentoSastEmpregadoDto>): Array<AcompanhamentoSastEmpregadoDto> {
        let array:Array<AcompanhamentoSastEmpregadoDto> = new Array<AcompanhamentoSastEmpregadoDto>();
    
        if (acompanhamentoSastEmpregados !== null && acompanhamentoSastEmpregados !== undefined) { 
            for (let acompanhamentoSastEmpregado of acompanhamentoSastEmpregados) {
                array.push(this.clone(acompanhamentoSastEmpregado));
            }
        }        
        return array;
    }
}
