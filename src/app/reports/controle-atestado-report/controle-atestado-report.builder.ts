import { ControleAtestadoDto } from './../../model/dto/controle-atestado-dto';
import { GenericBuilder } from './../../generics/generic.builder';
import { InterfaceBuilder } from './../../interfaces/interface.builder';

export class ControleAtestadoReportBuilder extends GenericBuilder implements InterfaceBuilder {

    initialize(atestado: ControleAtestadoDto) {
        atestado = new ControleAtestadoDto();
                
        return atestado;
    }
    
    initializeList(atestados: Array<ControleAtestadoDto>) {
        
        let array:Array<ControleAtestadoDto> = new Array<ControleAtestadoDto>();
        
        if(atestados === null || atestados === undefined)
            atestados = new Array<ControleAtestadoDto>();
        
        for (let atestado of atestados) {
            array.push(this.initialize(atestado));
        }
        
        return array;
    }
    
    clone(atestado: ControleAtestadoDto): ControleAtestadoDto {
        
        if (atestado === null || atestado === undefined)
            atestado = new ControleAtestadoDto();
        
        let cloneControleAtestadoDto = new ControleAtestadoDto();
        cloneControleAtestadoDto.setNomeEmpregado(this.getValue(atestado, "getNomeEmpregado"));
        cloneControleAtestadoDto.setMatricula(this.getValue(atestado, "getMatricula"));
        cloneControleAtestadoDto.setGerencia(this.getValue(atestado, "getGerencia"));
        cloneControleAtestadoDto.setBase(this.getValue(atestado, "getBase"));
        cloneControleAtestadoDto.setInicioAtestado(this.getValue(atestado, "getInicioAtestado"));
        cloneControleAtestadoDto.setFimAtestado(this.getValue(atestado, "getFimAtestado"));
        cloneControleAtestadoDto.setNumeroDias(this.getValue(atestado, "getNumeroDias"));
        cloneControleAtestadoDto.setDataRecebimento(this.getValue(atestado, "getDataRecebimento"))
        
        cloneControleAtestadoDto.setPrazoRecebimento(this.getValue(atestado, "getPrazoRecebimento"));
        cloneControleAtestadoDto.setRecebidoNoPrazo(this.getValue(atestado, "getRecebidoNoPrazo"));
        cloneControleAtestadoDto.setMesRecebimento(this.getValue(atestado, "getMesRecebimento"));
        cloneControleAtestadoDto.setDataEntrega(this.getValue(atestado, "getDataEntrega"));
        cloneControleAtestadoDto.setDataHomologacao(this.getValue(atestado, "getDataHomologacao"));
        cloneControleAtestadoDto.setPrazoHomologacao(this.getValue(atestado, "getPrazoHomologacao"));
        cloneControleAtestadoDto.setHomologadoNoPrazo(this.getValue(atestado, "getHomologadoNoPrazo"));
        cloneControleAtestadoDto.setMesHomologacao(this.getValue(atestado, "getMesHomologacao"));
        cloneControleAtestadoDto.setAbreviacaoEquipe(this.getValue(atestado, "getAbreviacaoEquipe"));
        cloneControleAtestadoDto.setTarefaProfissional(this.getValue(atestado, "getTarefaProfissional"));
        cloneControleAtestadoDto.setAtestadoFisicoRecebido(this.getValue(atestado, "getAtestadoFisicoRecebido"));
        cloneControleAtestadoDto.setObservacao(this.getValue(atestado, "getObservacao"));
        cloneControleAtestadoDto.setStatusAtestado(this.getValue(atestado, "getStatusAtestado"));
        cloneControleAtestadoDto.setDataAgendamento(this.getValue(atestado, "getDataAgendamento"));

        return cloneControleAtestadoDto;
    }
    
    cloneList(atestados: Array<ControleAtestadoDto>): Array<ControleAtestadoDto> {
        let array:Array<ControleAtestadoDto> = new Array<ControleAtestadoDto>();
    
        if (atestados !== null && atestados !== undefined) { 
            for (let atestado of atestados) {
                array.push(this.clone(atestado));
            }
        }        
        return array;
    }
}
