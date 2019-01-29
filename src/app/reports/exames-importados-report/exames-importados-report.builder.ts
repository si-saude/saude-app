import { ExamesImportadosDto } from './../../model/dto/exames-importados-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class ExamesImportadosReportBuilder extends GenericBuilder {
    
    initialize(examesImportadosDto: ExamesImportadosDto) {
        examesImportadosDto = new ExamesImportadosDto();
        
        return examesImportadosDto;
    }
    
    initializeList(examesImportados: Array<ExamesImportadosDto>) {
        
        let array:Array<ExamesImportadosDto> = new Array<ExamesImportadosDto>();
        
        if(examesImportados === null || examesImportados === undefined)
            examesImportados = new Array<ExamesImportadosDto>();
        
        for (let examesImportado of examesImportados) {
            array.push(this.initialize(examesImportado));
        }
        
        return array;
    }
    
    clone(examesImportado: ExamesImportadosDto): ExamesImportadosDto {
        
        if (examesImportado === null || examesImportado === undefined)
            examesImportado = new ExamesImportadosDto();
        
        let cloneExamesImportadosDto = new ExamesImportadosDto();
        
        cloneExamesImportadosDto.setBase(this.getValue(examesImportado,"getBase"));
        cloneExamesImportadosDto.setChave(this.getValue(examesImportado,"getChave"));
        cloneExamesImportadosDto.setDatasPreclinico(this.getValue(examesImportado,"getDatasPreclinico"));
        cloneExamesImportadosDto.setExamesPendentes(this.getValue(examesImportado,"getExamesPendentes"));
        cloneExamesImportadosDto.setExamesImportados(this.getValue(examesImportado,"getExamesImportados"));
        cloneExamesImportadosDto.setGerencia(this.getValue(examesImportado,"getGerencia"));
        cloneExamesImportadosDto.setMatricula(this.getValue(examesImportado,"getMatricula"));
        cloneExamesImportadosDto.setNome(this.getValue(examesImportado,"getNome"));
        cloneExamesImportadosDto.setResultadoAuditado(this.getValue(examesImportado,"getResultadoAuditado"));
        cloneExamesImportadosDto.setStatusPreclinico(this.getValue(examesImportado,"getStatusPreclinico"));
        cloneExamesImportadosDto.setTitulo(this.getValue(examesImportado,"getTitulo"));
        
        return cloneExamesImportadosDto;
    }
    
    cloneList(examesImportados: Array<ExamesImportadosDto>): Array<ExamesImportadosDto> {
        let array:Array<ExamesImportadosDto> = new Array<ExamesImportadosDto>();
    
        if (examesImportados !== null && examesImportados !== undefined) {    
            for (let examesImportado of examesImportados) {
                array.push(this.clone(examesImportado));
            }
        }
        
        return array;
    }
    
}