import { ConformidadeAsoDto } from './../../model/dto/conformidade-aso-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class ConformidadeAsoReportBuilder extends GenericBuilder {

    initialize(conformidadeAso: ConformidadeAsoDto) {
        conformidadeAso = new ConformidadeAsoDto();
                
        return conformidadeAso;
    }
    
    initializeList(conformidadeAsos: Array<ConformidadeAsoDto>) {
        
        let array:Array<ConformidadeAsoDto> = new Array<ConformidadeAsoDto>();
        
        if(conformidadeAsos === null || conformidadeAsos === undefined)
            conformidadeAsos = new Array<ConformidadeAsoDto>();
        
        for (let conformidadeAso of conformidadeAsos) {
            array.push(this.initialize(conformidadeAso));
        }
        
        return array;
    }
    
    clone(conformidadeAso: ConformidadeAsoDto): ConformidadeAsoDto {
        
        if (conformidadeAso === null || conformidadeAso === undefined)
            conformidadeAso = new ConformidadeAsoDto();
        
        let cloneConformidadeAsoDto = new ConformidadeAsoDto();
        cloneConformidadeAsoDto.setBase(this.getValue(conformidadeAso, "getBase"));
        cloneConformidadeAsoDto.setConforme(this.getValue(conformidadeAso, "getConforme"));
        cloneConformidadeAsoDto.setDataRealizacao(this.getValue(conformidadeAso, "getDataRealizacao"));
        cloneConformidadeAsoDto.setDataValidade(this.getValue(conformidadeAso, "getDataValidade"));
        cloneConformidadeAsoDto.setGerencia(this.getValue(conformidadeAso, "getGerencia"));
        cloneConformidadeAsoDto.setMatricula(this.getValue(conformidadeAso, "getMatricula"));
        cloneConformidadeAsoDto.setNome(this.getValue(conformidadeAso, "getNome"));
        
        return cloneConformidadeAsoDto;
    }
    
    cloneList(conformidadeAsos: Array<ConformidadeAsoDto>): Array<ConformidadeAsoDto> {
        let array:Array<ConformidadeAsoDto> = new Array<ConformidadeAsoDto>();
    
        if (conformidadeAsos !== null && conformidadeAsos !== undefined) { 
            for (let conformidadeAso of conformidadeAsos) {
                array.push(this.clone(conformidadeAso));
            }
        }        
        return array;
    }
}
