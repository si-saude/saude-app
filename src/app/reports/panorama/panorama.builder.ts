import { PanoramaDto } from './../../model/dto/panorama-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class PanoramaBuilder extends GenericBuilder {
    
    initialize(panoramaDto: PanoramaDto) {
        panoramaDto = new PanoramaDto();
        
        return panoramaDto;
    }
    
    initializeList(panoramaDtos: Array<PanoramaDto>) {
        
        let array:Array<PanoramaDto> = new Array<PanoramaDto>();
        
        if(panoramaDtos === null || panoramaDtos === undefined)
            panoramaDtos = new Array<PanoramaDto>();
        
        for (let panoramaDto of panoramaDtos) {
            array.push(this.initialize(panoramaDto));
        }
        
        return array;
    }
    
    clone(panoramaDto: PanoramaDto): PanoramaDto {
        
        if (panoramaDto === null || panoramaDto === undefined)
            panoramaDto = new PanoramaDto();
        
        let clonePanoramaDto = new PanoramaDto();
        
        clonePanoramaDto.setId(this.getValue(panoramaDto,"getId"));
        clonePanoramaDto.setGerencia(this.getValue(panoramaDto,"getGerencia"));
        clonePanoramaDto.setMatricula(this.getValue(panoramaDto,"getMatricula"));
        clonePanoramaDto.setNome(this.getValue(panoramaDto,"getNome"));
        clonePanoramaDto.setMesConvocacao(this.getValue(panoramaDto,"getMesConvocacao"));
        clonePanoramaDto.setBase(this.getValue(panoramaDto,"getBase"));
        clonePanoramaDto.setDataAsoAnoAnterior(this.getValue(panoramaDto,"getDataAsoAnoAnterior"));
        clonePanoramaDto.setDataAsoAnoAtual(this.getValue(panoramaDto,"getDataAsoAnoAtual"));
        clonePanoramaDto.setDataRealizacaoPreClinico(this.getValue(panoramaDto,"getDataRealizacaoPreClinico"));
        clonePanoramaDto.setSituacaoAso(this.getValue(panoramaDto,"getSituacaoAso"));
        clonePanoramaDto.setAsoNoPrazo(this.getValue(panoramaDto,"getAsoNoPrazo"));
        clonePanoramaDto.setPendencias(this.getValue(panoramaDto,"getPendencias"));
        clonePanoramaDto.setGerenciaPrimeiraLinha(this.getValue(panoramaDto,"getGerenciaPrimeiraLinha"));
        clonePanoramaDto.setStatusPreClinico(this.getValue(panoramaDto,"getStatusPreClinico"));
        clonePanoramaDto.setExamesPendentes(this.getValue(panoramaDto,"getExamesPendentes"));
        clonePanoramaDto.setExistePendenciaExames(this.getValue(panoramaDto,"getExistePendenciaExames"));
        
        return clonePanoramaDto;
    }
    
    cloneList(panoramaDtos: Array<PanoramaDto>): Array<PanoramaDto> {
        let array:Array<PanoramaDto> = new Array<PanoramaDto>();
    
        if (panoramaDtos !== null && panoramaDtos !== undefined) {    
            for (let panoramaDto of panoramaDtos) {
                array.push(this.clone(panoramaDto));
            }
        }
        
        return array;
    }
    
}