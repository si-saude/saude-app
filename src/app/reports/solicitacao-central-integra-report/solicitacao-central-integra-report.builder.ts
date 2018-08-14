import { SolicitacaoCentralIntegraDto } from './../../model/dto/solicitacao-central-integra-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class SolicitacaoCentralIntegraReportBuilder extends GenericBuilder {

    initialize(solicitacaoCentralIntegra: SolicitacaoCentralIntegraDto) {
        solicitacaoCentralIntegra = new SolicitacaoCentralIntegraDto();
                
        return solicitacaoCentralIntegra;
    }
    
    initializeList(solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegraDto>) {
        
        let array:Array<SolicitacaoCentralIntegraDto> = new Array<SolicitacaoCentralIntegraDto>();
        
        if(solicitacaoCentralIntegras === null || solicitacaoCentralIntegras === undefined)
            solicitacaoCentralIntegras = new Array<SolicitacaoCentralIntegraDto>();
        
        for (let solicitacaoCentralIntegra of solicitacaoCentralIntegras) {
            array.push(this.initialize(solicitacaoCentralIntegra));
        }
        
        return array;
    }
    
    clone(solicitacaoCentralIntegra: SolicitacaoCentralIntegraDto): SolicitacaoCentralIntegraDto {
        
        if (solicitacaoCentralIntegra === null || solicitacaoCentralIntegra === undefined)
            solicitacaoCentralIntegra = new SolicitacaoCentralIntegraDto();
        
        let cloneSolicitacaoCentralIntegraDto = new SolicitacaoCentralIntegraDto();
        cloneSolicitacaoCentralIntegraDto.setId(this.getValue(solicitacaoCentralIntegra, "getId"));
        cloneSolicitacaoCentralIntegraDto.setNome(this.getValue(solicitacaoCentralIntegra, "getNome"));
        cloneSolicitacaoCentralIntegraDto.setAbertura(this.getValue(solicitacaoCentralIntegra, "getAbertura"));
        cloneSolicitacaoCentralIntegraDto.setConcluido(this.getValue(solicitacaoCentralIntegra, "getConcluido"));
        cloneSolicitacaoCentralIntegraDto.setAtrasado(this.getValue(solicitacaoCentralIntegra, "getAtrasado"));
        cloneSolicitacaoCentralIntegraDto.setDescricao(this.getValue(solicitacaoCentralIntegra, "getDescricao"));
        cloneSolicitacaoCentralIntegraDto.setObservacao(this.getValue(solicitacaoCentralIntegra, "getObservacao"));
        cloneSolicitacaoCentralIntegraDto.setPrazo(this.getValue(solicitacaoCentralIntegra, "getPrazo"));
        cloneSolicitacaoCentralIntegraDto.setStatus(this.getValue(solicitacaoCentralIntegra, "getStatus"));
                
        return cloneSolicitacaoCentralIntegraDto;
    }
    
    cloneList(solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegraDto>): Array<SolicitacaoCentralIntegraDto> {
        let array:Array<SolicitacaoCentralIntegraDto> = new Array<SolicitacaoCentralIntegraDto>();
    
        if (solicitacaoCentralIntegras !== null && solicitacaoCentralIntegras !== undefined) { 
            for (let solicitacaoCentralIntegra of solicitacaoCentralIntegras) {
                array.push(this.clone(solicitacaoCentralIntegra));
            }
        }
        
        return array;
    }
}