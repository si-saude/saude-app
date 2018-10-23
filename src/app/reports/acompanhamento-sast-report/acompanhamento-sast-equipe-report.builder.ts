import { AcompanhamentoSastEquipeDto } from './../../model/dto/acompanhamento-sast-equipe-dto';
import { AcompanhamentoSastIndicadorReportBuilder } from './acompanhamento-sast-indicador-report.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoSastEquipeReportBuilder extends GenericBuilder {

    initialize(acompanhamentoSastEquipe: AcompanhamentoSastEquipeDto) {
        acompanhamentoSastEquipe = new AcompanhamentoSastEquipeDto();
        
        acompanhamentoSastEquipe.setIndicadores(new AcompanhamentoSastIndicadorReportBuilder().initializeList(null));
                
        return acompanhamentoSastEquipe;
    }
    
    initializeList(acompanhamentoSastEquipes: Array<AcompanhamentoSastEquipeDto>) {
        
        let array:Array<AcompanhamentoSastEquipeDto> = new Array<AcompanhamentoSastEquipeDto>();
        
        if(acompanhamentoSastEquipes === null || acompanhamentoSastEquipes === undefined)
            acompanhamentoSastEquipes = new Array<AcompanhamentoSastEquipeDto>();
        
        for (let acompanhamentoSastEquipe of acompanhamentoSastEquipes) {
            array.push(this.initialize(acompanhamentoSastEquipe));
        }
        
        return array;
    }
    
    clone(acompanhamentoSastEquipe: AcompanhamentoSastEquipeDto): AcompanhamentoSastEquipeDto {
        
        if (acompanhamentoSastEquipe === null || acompanhamentoSastEquipe === undefined)
            acompanhamentoSastEquipe = new AcompanhamentoSastEquipeDto();
        
        let cloneAcompanhamentoSastEquipeDto = new AcompanhamentoSastEquipeDto();
        cloneAcompanhamentoSastEquipeDto.setNome(this.getValue(acompanhamentoSastEquipe, "getNome"));
        cloneAcompanhamentoSastEquipeDto.setIndicadores(
                new AcompanhamentoSastIndicadorReportBuilder().cloneList(
                        this.getValue(acompanhamentoSastEquipe, "getIndicadores")));
        
        return cloneAcompanhamentoSastEquipeDto;
    }
    
    cloneList(acompanhamentoSastEquipes: Array<AcompanhamentoSastEquipeDto>): Array<AcompanhamentoSastEquipeDto> {
        let array:Array<AcompanhamentoSastEquipeDto> = new Array<AcompanhamentoSastEquipeDto>();
    
        if (acompanhamentoSastEquipes !== null && acompanhamentoSastEquipes !== undefined) { 
            for (let acompanhamentoSastEquipe of acompanhamentoSastEquipes) {
                array.push(this.clone(acompanhamentoSastEquipe));
            }
        }        
        return array;
    }
}
