import { RiscoPotencialDto } from './../../model/dto/risco-potencial-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class RiscoPotencialReportBuilder extends GenericBuilder {
    initialize(riscoPotencial: RiscoPotencialDto) {
        riscoPotencial = new RiscoPotencialDto();
        
        return riscoPotencial;
    }
    
    initializeList(riscoPotencials: Array<RiscoPotencialDto>) {
        
        let array:Array<RiscoPotencialDto> = new Array<RiscoPotencialDto>();
        
        if(riscoPotencials === null || riscoPotencials === undefined)
            riscoPotencials = new Array<RiscoPotencialDto>();
        
        for (let riscoPotencial of riscoPotencials) {
            array.push(this.initialize(riscoPotencial));
        }
        
        return array;
    }
    
    clone(riscoPotencial: RiscoPotencialDto): RiscoPotencialDto {
        if (riscoPotencial === null || riscoPotencial === undefined)
            riscoPotencial = new RiscoPotencialDto();
        
        let cloneRiscoPotencial = new RiscoPotencialDto();
        cloneRiscoPotencial.setId(this.getValue(riscoPotencial,"getId"));
        cloneRiscoPotencial.setRanking(this.getValue(riscoPotencial,"getRanking"));
        cloneRiscoPotencial.setEmpregadoNome(this.getValue(riscoPotencial,"getEmpregadoNome"));
        cloneRiscoPotencial.setData(this.getValue(riscoPotencial,"getData"));
        cloneRiscoPotencial.setEquipeResponsavelNome(this.getValue(riscoPotencial,"getEquipeResponsavelNome"));
        cloneRiscoPotencial.setStatus(this.getValue(riscoPotencial,"getStatus"));
        cloneRiscoPotencial.setStatusRPSat(this.getValue(riscoPotencial,"getStatusRPSat"));
        cloneRiscoPotencial.setAbreviacaoEquipeAcolhimento(this.getValue(riscoPotencial,"getAbreviacaoEquipeAcolhimento"));
        
        return cloneRiscoPotencial;
    }
    
    cloneList(riscoPotencials: Array<RiscoPotencialDto>): Array<RiscoPotencialDto> {
        let array:Array<RiscoPotencialDto> = new Array<RiscoPotencialDto>();
    
        if (riscoPotencials !== null && riscoPotencials !== undefined) {    
            for (let riscoPotencial of riscoPotencials) {
                array.push(this.clone(riscoPotencial));
            }
        }
        
        return array;
    }
    
}