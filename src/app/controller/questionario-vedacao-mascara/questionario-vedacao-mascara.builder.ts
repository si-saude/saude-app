import { QuestionarioVedacaoMascara } from './../../model/questionario-vedacao-mascara';

import { GenericBuilder } from './../../generics/generic.builder';

export class QuestionarioVedacaoMascaraBuilder extends GenericBuilder {

    initialize(questionarioVedacaoMascara: QuestionarioVedacaoMascara) {
        questionarioVedacaoMascara = new QuestionarioVedacaoMascara();      
        return questionarioVedacaoMascara;
    }
    
    initializeList(questionarioVedacaoMascaraes: Array<QuestionarioVedacaoMascara>) {
        
        let array:Array<QuestionarioVedacaoMascara> = new Array<QuestionarioVedacaoMascara>();
        
        if(questionarioVedacaoMascaraes === null || questionarioVedacaoMascaraes === undefined)
            questionarioVedacaoMascaraes = new Array<QuestionarioVedacaoMascara>();
        
        for (let questionarioVedacaoMascara of questionarioVedacaoMascaraes) {
            array.push(this.initialize(questionarioVedacaoMascara));
        }
        
        return array;
    }
    
    clone(questionarioVedacaoMascara: QuestionarioVedacaoMascara): QuestionarioVedacaoMascara {
        
        if (questionarioVedacaoMascara === null || questionarioVedacaoMascara === undefined)
            questionarioVedacaoMascara = new QuestionarioVedacaoMascara();
        
        let cloneQuestionarioVedacaoMascara = new QuestionarioVedacaoMascara();
        cloneQuestionarioVedacaoMascara.setId(this.getValue(questionarioVedacaoMascara,"getId"));
        cloneQuestionarioVedacaoMascara.setVersion(this.getValue(questionarioVedacaoMascara, "getVersion"));

        cloneQuestionarioVedacaoMascara.setData(this.getValue(questionarioVedacaoMascara, "getData"));
        cloneQuestionarioVedacaoMascara.setFumacaIrritante(this.getValue(questionarioVedacaoMascara, "getFumacaIrritante"));
        cloneQuestionarioVedacaoMascara.setSacarina(this.getValue(questionarioVedacaoMascara, "getSacarina"));
        cloneQuestionarioVedacaoMascara.setAcetatoIsoamil(this.getValue(questionarioVedacaoMascara, "getAcetatoIsoamil"));
        cloneQuestionarioVedacaoMascara.setBenzoatoDetonium(this.getValue(questionarioVedacaoMascara, "getBenzoatoDetonium"));
        cloneQuestionarioVedacaoMascara.setTipoRespirador(this.getValue(questionarioVedacaoMascara, "getTipoRespirador"));
        cloneQuestionarioVedacaoMascara.setTamanhoRespirador(this.getValue(questionarioVedacaoMascara, "getTamanhoRespirador"));
        
        cloneQuestionarioVedacaoMascara.setModelo(this.getValue(questionarioVedacaoMascara, "getModelo"));
        cloneQuestionarioVedacaoMascara.setNumeroCertificadoAprovacao(this.getValue(questionarioVedacaoMascara, "getNumeroCertificadoAprovacao"));
        cloneQuestionarioVedacaoMascara.setFiltroUtilizado(this.getValue(questionarioVedacaoMascara, "getFiltroUtilizado"));
        cloneQuestionarioVedacaoMascara.setBarba(this.getValue(questionarioVedacaoMascara, "getBarba"));
        cloneQuestionarioVedacaoMascara.setBigode(this.getValue(questionarioVedacaoMascara, "getBigode"));
        cloneQuestionarioVedacaoMascara.setCosteleta(this.getValue(questionarioVedacaoMascara, "getCosteleta"));
        cloneQuestionarioVedacaoMascara.setnAPelosFace(this.getValue(questionarioVedacaoMascara, "getnAPelosFace"));
        cloneQuestionarioVedacaoMascara.setOculos(this.getValue(questionarioVedacaoMascara, "getOculos"));
        cloneQuestionarioVedacaoMascara.setLenteContato(this.getValue(questionarioVedacaoMascara, "getLenteContato"));
        cloneQuestionarioVedacaoMascara.setnACorrecaoVisao(this.getValue(questionarioVedacaoMascara, "getnACorrecaoVisao"));
        cloneQuestionarioVedacaoMascara.setSatisfatoria(this.getValue(questionarioVedacaoMascara, "getSatisfatoria"));
        cloneQuestionarioVedacaoMascara.setDeficiente(this.getValue(questionarioVedacaoMascara, "getDeficiente"));
        cloneQuestionarioVedacaoMascara.setnATesteQualitativo(this.getValue(questionarioVedacaoMascara, "getnATesteQualitativo"));
        cloneQuestionarioVedacaoMascara.setFiltroUtilizado(this.getValue(questionarioVedacaoMascara, "getFiltroUtilizado"));
        
        cloneQuestionarioVedacaoMascara.setSatisfatoriaTestePressao(this.getValue(questionarioVedacaoMascara, "getSatisfatoriaTestePressao"));
        cloneQuestionarioVedacaoMascara.setDeficienteTestePressao(this.getValue(questionarioVedacaoMascara, "getDeficienteTestePressao"));
        cloneQuestionarioVedacaoMascara.setnATestePressao(this.getValue(questionarioVedacaoMascara, "getnATestePressao"));
        cloneQuestionarioVedacaoMascara.setResultadoTesteVedacao(this.getValue(questionarioVedacaoMascara, "getResultadoTesteVedacao"));
        cloneQuestionarioVedacaoMascara.setComentario(this.getValue(questionarioVedacaoMascara, "getComentario"));
        cloneQuestionarioVedacaoMascara.setExposicaoAerodispersoide(this.getValue(questionarioVedacaoMascara, "getExposicaoAerodispersoide"));
        cloneQuestionarioVedacaoMascara.setHoraUsada(this.getValue(questionarioVedacaoMascara, "getHoraUsada"));
        cloneQuestionarioVedacaoMascara.setDiaUsado(this.getValue(questionarioVedacaoMascara, "getDiaUsado"));
        cloneQuestionarioVedacaoMascara.setEsforcoFisicoUtilizandoMascara(this.getValue(questionarioVedacaoMascara, "getEsforcoFisicoUtilizandoMascara"));
        
        
        
        return cloneQuestionarioVedacaoMascara;
    }
    
    cloneList(questionarioVedacaoMascaraes: Array<QuestionarioVedacaoMascara>): Array<QuestionarioVedacaoMascara> {
        let array:Array<QuestionarioVedacaoMascara> = new Array<QuestionarioVedacaoMascara>();
        if (questionarioVedacaoMascaraes !== null && questionarioVedacaoMascaraes !== undefined) { 
            for (let questionarioVedacaoMascara of questionarioVedacaoMascaraes) {
                array.push(this.clone(questionarioVedacaoMascara));
            }
        }
        
        return array;
    }
    
}