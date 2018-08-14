import { CatDto } from './../../model/dto/cat-dto';
import { GenericBuilder } from './../../generics/generic.builder';

export class CatReportBuilder extends GenericBuilder {

    initialize(cat: CatDto) {
        cat = new CatDto();
                
        return cat;
    }
    
    initializeList(cats: Array<CatDto>) {
        
        let array:Array<CatDto> = new Array<CatDto>();
        
        if(cats === null || cats === undefined)
            cats = new Array<CatDto>();
        
        for (let cat of cats) {
            array.push(this.initialize(cat));
        }
        
        return array;
    }
    
    clone(cat: CatDto): CatDto {
        
        if (cat === null || cat === undefined)
            cat = new CatDto();
        
        let cloneCatDto = new CatDto();
        cloneCatDto.setAfastamento(this.getValue(cat, "getAfastamento"));
        cloneCatDto.setAgenteCausador(this.getValue(cat, "getAgenteCausador"));
        cloneCatDto.setCargo(this.getValue(cat, "getCargo"));
        cloneCatDto.setCatSd2000(this.getValue(cat, "getCatSd2000"));
        cloneCatDto.setClassificacaoSisin(this.getValue(cat, "getClassificacaoSisin"));
        cloneCatDto.setCodigoCartaSindicato(this.getValue(cat, "getCodigoCartaSindicato"));
        cloneCatDto.setComunicavelSus(this.getValue(cat, "getComunicavelSus"));
        cloneCatDto.setContratado(this.getValue(cat, "getContratado"));
        cloneCatDto.setCpf(this.getValue(cat, "getCpf"));
        cloneCatDto.setDataAvaliacaoMedica(this.getValue(cat, "getDataAvaliacaoMedica"));
        cloneCatDto.setDataComunicacaoSindicato(this.getValue(cat, "getDataComunicacaoSindicato"));
        cloneCatDto.setDataEmissaoCat(this.getValue(cat, "getDataEmissaoCat"));
        cloneCatDto.setDiaHoraAcidente(this.getValue(cat, "getDiaHoraAcidente"));
        cloneCatDto.setDataNascimento(this.getValue(cat, "getDataNascimento"));
        cloneCatDto.setDiagnostico(this.getValue(cat, "getDiagnostico"));
        cloneCatDto.setFerimentoGraveConformeAnp(this.getValue(cat, "getFerimentoGraveConformeAnp"));
        cloneCatDto.setFornecedor(this.getValue(cat, "getFornecedor"));
        cloneCatDto.setGerencia(this.getValue(cat, "getGerencia"));
        cloneCatDto.setGravidade(this.getValue(cat, "getGravidade"));
        cloneCatDto.setInstalacao(this.getValue(cat, "getInstalacao"));
        cloneCatDto.setNaturezaLesao(this.getValue(cat, "getNaturezaLesao"));
        cloneCatDto.setNome(this.getValue(cat, "getNome"));
        cloneCatDto.setNumero(this.getValue(cat, "getNumero"));
        cloneCatDto.setParteCorpoAtingida(this.getValue(cat, "getParteCorpoAtingida"));
        cloneCatDto.setRegime(this.getValue(cat, "getRegime"));
        cloneCatDto.setRegistoSd2000(this.getValue(cat, "getRegistoSd2000"));
        cloneCatDto.setRemuneracao(this.getValue(cat, "getRemuneracao"));
        cloneCatDto.setRta(this.getValue(cat, "getRta"));
        cloneCatDto.setSexo(this.getValue(cat, "getSexo"));
        cloneCatDto.setTipoAcidente(this.getValue(cat, "getTipoAcidente"));
        cloneCatDto.setTipoCat(this.getValue(cat, "getTipoCat"));1
        
        return cloneCatDto;
    }
    
    cloneList(cats: Array<CatDto>): Array<CatDto> {
        let array:Array<CatDto> = new Array<CatDto>();
    
        if (cats !== null && cats !== undefined) { 
            for (let cat of cats) {
                array.push(this.clone(cat));
            }
        }        
        return array;
    }
}
