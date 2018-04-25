import { EmpregadosPorGrupoDto } from './../../model/dto/empregados-por-grupo-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class EmpregadosPorGrupoBuilder extends GenericBuilder {

    initialize(empregadosPorGrupo: EmpregadosPorGrupoDto) {
        empregadosPorGrupo = new EmpregadosPorGrupoDto();
                
        return empregadosPorGrupo;
    }
    
    initializeList(empregadosPorGrupos: Array<EmpregadosPorGrupoDto>) {
        
        let array:Array<EmpregadosPorGrupoDto> = new Array<EmpregadosPorGrupoDto>();
        
        if(empregadosPorGrupos === null || empregadosPorGrupos === undefined)
            empregadosPorGrupos = new Array<EmpregadosPorGrupoDto>();
        
        for (let empregadosPorGrupo of empregadosPorGrupos) {
            array.push(this.initialize(empregadosPorGrupo));
        }
        
        return array;
    }
    
    clone(empregadosPorGrupo: EmpregadosPorGrupoDto): EmpregadosPorGrupoDto {
        
        if (empregadosPorGrupo === null || empregadosPorGrupo === undefined)
            empregadosPorGrupo = new EmpregadosPorGrupoDto();
        
        let cloneEmpregadosPorGrupoDto = new EmpregadosPorGrupoDto();
        cloneEmpregadosPorGrupoDto.setChave(this.getValue(empregadosPorGrupo, "getChave"));
        cloneEmpregadosPorGrupoDto.setNome(this.getValue(empregadosPorGrupo, "getNome"));
        cloneEmpregadosPorGrupoDto.setGerencia(this.getValue(empregadosPorGrupo, "getGerencia"));
        cloneEmpregadosPorGrupoDto.setMatricula(this.getValue(empregadosPorGrupo, "getMatricula"));
                
        return cloneEmpregadosPorGrupoDto;
    }
    
    cloneList(empregadosPorGrupos: Array<EmpregadosPorGrupoDto>): Array<EmpregadosPorGrupoDto> {
        let array:Array<EmpregadosPorGrupoDto> = new Array<EmpregadosPorGrupoDto>();
    
        if (empregadosPorGrupos !== null && empregadosPorGrupos !== undefined) { 
            for (let empregadosPorGrupo of empregadosPorGrupos) {
                array.push(this.clone(empregadosPorGrupo));
            }
        }
        
        return array;
    }
}