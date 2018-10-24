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
        cloneCatDto.setOrgao(this.getValue(cat, "getOrgao"));
        cloneCatDto.setRta(this.getValue(cat, "getRta"));
        cloneCatDto.setMes(this.getValue(cat, "getMes"));
        cloneCatDto.setDiaSemana(this.getValue(cat, "getDiaSemana"));
        cloneCatDto.setInstalacao(this.getValue(cat, "getInstalacao"));
        cloneCatDto.setProprioContratado(this.getValue(cat, "getProprioContratado"));
        cloneCatDto.setEmpresa(this.getValue(cat, "getEmpresa"));
        cloneCatDto.setCnae(this.getValue(cat, "getCnae"));
        cloneCatDto.setGrauRiscoEmpresa(this.getValue(cat, "getGrauRiscoEmpresa"));
        cloneCatDto.setNomeAcidentado(this.getValue(cat, "getNomeAcidentado"));
        cloneCatDto.setRegimeTrabalho(this.getValue(cat, "getRegimeTrabalho"));
        cloneCatDto.setJornadaTrabalho(this.getValue(cat, "getJornadaTrabalho"));
        cloneCatDto.setAcidenteComSemAfastamento(this.getValue(cat, "getAcidenteComSemAfastamento"));
        cloneCatDto.setParteCorpoAtingida(this.getValue(cat, "getParteCorpoAtingida"));
        cloneCatDto.setHoraAcidente(this.getValue(cat, "getHoraAcidente"));
        cloneCatDto.setMunicipioAcidente(this.getValue(cat, "getMunicipioAcidente"));
        cloneCatDto.setNumeroSisin(this.getValue(cat, "getNumeroSisin"));
        cloneCatDto.setClassificacaoSisin(this.getValue(cat, "getClassificacaoSisin"));
        cloneCatDto.setDataAcidente(this.getValue(cat, "getDataAcidente"));
        cloneCatDto.setDataEmissaoCat(this.getValue(cat, "getDataEmissaoCat"));
        cloneCatDto.setDiasAtraso(this.getValue(cat, "getDiasAtraso"));
        cloneCatDto.setPrazo(this.getValue(cat, "getPrazo"));
        cloneCatDto.setClassificacaoGravidade(this.getValue(cat, "getClassificacaoGravidade"));
        cloneCatDto.setDataAvaliacaoMedica(this.getValue(cat, "getDataAvaliacaoMedica"));
        cloneCatDto.setRegistroSd2000(this.getValue(cat, "getRegistroSd2000"));
        cloneCatDto.setCatSd2000(this.getValue(cat, "getCatSd2000"));
        cloneCatDto.setSituacaoAvaliacaoMedica(this.getValue(cat, "getSituacaoAvaliacaoMedica"));
        cloneCatDto.setDataLiberacao(this.getValue(cat, "getDataLiberacao"));
        cloneCatDto.setPendenciaCorrecaoCat(this.getValue(cat, "getPendenciaCorrecaoCat"));
        cloneCatDto.setJustificativaAtrasoEmissaoCat(this.getValue(cat, "getJustificativaAtrasoEmissaoCat"));
        cloneCatDto.setNumeroCartaMultaEmpresa(this.getValue(cat, "getNumeroCartaMultaEmpresa"));
        cloneCatDto.setTipoAcidente(this.getValue(cat, "getTipoAcidente"));
        cloneCatDto.setTipoCat(this.getValue(cat, "getTipoCat"));
        cloneCatDto.setDiagnosticoProvavel(this.getValue(cat, "getDiagnosticoProvavel"));
        cloneCatDto.setAgenteCausador(this.getValue(cat, "getAgenteCausador"));
        cloneCatDto.setComunicavelSus(this.getValue(cat, "getComunicavelSus"));
        cloneCatDto.setFerimentoGraveConformeANP(this.getValue(cat, "getFerimentoGraveConformeANP"));
        cloneCatDto.setNumeroCat(this.getValue(cat, "getNumeroCat"));
        cloneCatDto.setLocalizacaoLesao(this.getValue(cat, "getLocalizacaoLesao"));
        cloneCatDto.setNaturezaLesao(this.getValue(cat, "getNaturezaLesao"));
        cloneCatDto.setDiasAfastamento(this.getValue(cat, "getDiasAfastamento"));
        cloneCatDto.setIntervaloAfastamento(this.getValue(cat, "getIntervaloAfastamento"));
        cloneCatDto.setHorasPerdidas(this.getValue(cat, "getHorasPerdidas"));
        cloneCatDto.setSalarioHora(this.getValue(cat, "getSalarioHora"));
        cloneCatDto.setCustoAcidente2(this.getValue(cat, "getCustoAcidente2"));
        cloneCatDto.setCodigoCartaSindicato(this.getValue(cat, "getCodigoCartaSindicato"));
        cloneCatDto.setClassificacaoAnomalia(this.getValue(cat, "getClassificacaoAnomalia"));
        cloneCatDto.setDataComunicacaoSindicato(this.getValue(cat, "getDataComunicacaoSindicato"));
        cloneCatDto.setDiasAcidenteComunicacaoSindicato(this.getValue(cat, "getDiasAcidenteComunicacaoSindicato"));
        cloneCatDto.setJustificativaAtrasoEmissaoCarta(this.getValue(cat, "getJustificativaAtrasoEmissaoCarta"));
        cloneCatDto.setDataNascimento(this.getValue(cat, "getDataNascimento"));
        cloneCatDto.setIdade(this.getValue(cat, "getIdade"));
        cloneCatDto.setSexo(this.getValue(cat, "getSexo"));
        cloneCatDto.setGrauInstrucao(this.getValue(cat, "getGrauInstrucao"));
        cloneCatDto.setEstadoCivil(this.getValue(cat, "getEstadoCivil"));
        cloneCatDto.setRemuneracao(this.getValue(cat, "getRemuneracao"));
        cloneCatDto.setCargo(this.getValue(cat, "getCargo"));
        cloneCatDto.setAto1(this.getValue(cat, "getAto1"));
        cloneCatDto.setAto2(this.getValue(cat, "getAto2"));
        cloneCatDto.setAto3(this.getValue(cat, "getAto3"));
        cloneCatDto.setAto4(this.getValue(cat, "getAto4"));
        
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
