import { AtestadoDto } from './../../model/dto/atestado-dto';
import { GenericBuilder } from './../../generics/generic.builder';
import { InterfaceBuilder } from './../../interfaces/interface.builder';

export class AtestadoReportBuilder extends GenericBuilder implements InterfaceBuilder {

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
        
        cloneAtestadoDto.setMatricula(this.getValue(atestado, "getMatricula"));
        cloneAtestadoDto.setGerencia(this.getValue(atestado, "getGerencia"));
        cloneAtestadoDto.setBase(this.getValue(atestado, "getBase"));
        
        cloneAtestadoDto.setPrazoRecebimento(this.getValue(atestado, "getPrazoRecebimento"));
        cloneAtestadoDto.setRecebidoNoPrazo(this.getValue(atestado, "getRecebidoNoPrazo"));
        cloneAtestadoDto.setMesRecebimento(this.getValue(atestado, "getMesRecebimento"));
        cloneAtestadoDto.setFim(this.getValue(atestado, "getFim"));
        
        cloneAtestadoDto.setDataHomologacao(this.getValue(atestado, "getDataHomologacao"));
        cloneAtestadoDto.setDataEntrega(this.getValue(atestado, "getDataEntrega"));
        cloneAtestadoDto.setPrazoHomologacao(this.getValue(atestado, "getPrazoHomologacao"));
        cloneAtestadoDto.setHomologacaoNoPrazo(this.getValue(atestado, "getHomologacaoNoPrazo"));
        cloneAtestadoDto.setMesHomologacao(this.getValue(atestado, "getMesHomologacao"));
        cloneAtestadoDto.setMedicoOdonto(this.getValue(atestado, "getMedicoOdonto"));
        cloneAtestadoDto.setNomeProfissionalHomologacao(this.getValue(atestado, "getNomeProfissionalHomologacao"));
        cloneAtestadoDto.setObservacao(this.getValue(atestado, "getObservacao"));
        
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
