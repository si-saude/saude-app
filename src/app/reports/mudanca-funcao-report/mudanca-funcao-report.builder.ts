import { MudancaFuncaoDto } from './../../model/dto/mudanca-funcao-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class MudancaFuncaoReportBuilder extends GenericBuilder {

    initialize(mudancaFuncao: MudancaFuncaoDto) {
        mudancaFuncao = new MudancaFuncaoDto();
                
        return mudancaFuncao;
    }
    
    initializeList(mudancaFuncoes: Array<MudancaFuncaoDto>) {
        
        let array:Array<MudancaFuncaoDto> = new Array<MudancaFuncaoDto>();
        
        if(mudancaFuncoes === null || mudancaFuncoes === undefined)
            mudancaFuncoes = new Array<MudancaFuncaoDto>();
        
        for (let mudancaFuncao of mudancaFuncoes) {
            array.push(this.initialize(mudancaFuncao));
        }
        
        return array;
    }
    
    clone(mudancaFuncao: MudancaFuncaoDto): MudancaFuncaoDto {
        
        if (mudancaFuncao === null || mudancaFuncao === undefined)
            mudancaFuncao = new MudancaFuncaoDto();
        
        let cloneMudancaFuncaoDto = new MudancaFuncaoDto();
        cloneMudancaFuncaoDto.setDataInicioTarefaHigiene(this.getValue(mudancaFuncao, "getDataInicioTarefaHigiene"));
        cloneMudancaFuncaoDto.setNomeEmpregado(this.getValue(mudancaFuncao, "getNomeEmpregado"));
        cloneMudancaFuncaoDto.setMatriculaEmpregado(this.getValue(mudancaFuncao, "getMatriculaEmpregado")); 
        cloneMudancaFuncaoDto.setGerenciaAtual(this.getValue(mudancaFuncao, "getGerenciaAtual"));
        cloneMudancaFuncaoDto.setGerenciaFutura(this.getValue(mudancaFuncao, "getGerenciaFutura")); 
        cloneMudancaFuncaoDto.setGheAtual(this.getValue(mudancaFuncao, "getGheAtual"));
        cloneMudancaFuncaoDto.setGheFuturo(this.getValue(mudancaFuncao, "getGheFuturo"));
        cloneMudancaFuncaoDto.setGheeAtual(this.getValue(mudancaFuncao, "getGheeAtual"));
        cloneMudancaFuncaoDto.setGheeFuturo(this.getValue(mudancaFuncao, "getGheeFuturo"));
        cloneMudancaFuncaoDto.setFuncaoAtual(this.getValue(mudancaFuncao, "getFuncaoAtual"));
        cloneMudancaFuncaoDto.setFuncaoFuturo(this.getValue(mudancaFuncao, "getFuncaoFuturo"));
        cloneMudancaFuncaoDto.setRegimeAtual(this.getValue(mudancaFuncao, "getRegimeAtual"));
        cloneMudancaFuncaoDto.setRegimeFuturo(this.getValue(mudancaFuncao, "getRegimeFuturo"));
        cloneMudancaFuncaoDto.setBaseAtual(this.getValue(mudancaFuncao, "getBaseAtual"));
        cloneMudancaFuncaoDto.setBaseFuturo(this.getValue(mudancaFuncao, "getBaseFuturo"));
        cloneMudancaFuncaoDto.setEnfaseAtual(this.getValue(mudancaFuncao, "getEnfaseAtual"));
        cloneMudancaFuncaoDto.setEnfaseFuturo(this.getValue(mudancaFuncao, "getEnfaseFuturo"));
        cloneMudancaFuncaoDto.setStatusTarefaHigiene(this.getValue(mudancaFuncao, "getStatusTarefaHigiene"));
        cloneMudancaFuncaoDto.setStatusTarefaErgonomia(this.getValue(mudancaFuncao, "getStatusTarefaErgonomia"));
        cloneMudancaFuncaoDto.setStatusTarefaMedicina(this.getValue(mudancaFuncao, "getStatusTarefaMedicina"));
        cloneMudancaFuncaoDto.setAtividades(this.getValue(mudancaFuncao, "getAtividades"));
        
        return cloneMudancaFuncaoDto;
    }
    
    cloneList(mudancaFuncoes: Array<MudancaFuncaoDto>): Array<MudancaFuncaoDto> {
        let array:Array<MudancaFuncaoDto> = new Array<MudancaFuncaoDto>();
    
        if (mudancaFuncoes !== null && mudancaFuncoes !== undefined) { 
            for (let mudancaFuncao of mudancaFuncoes) {
                array.push(this.clone(mudancaFuncao));
            }
        }        
        return array;
    }
}
