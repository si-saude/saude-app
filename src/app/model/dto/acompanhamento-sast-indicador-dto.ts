import { AcompanhamentoSastAcaoDto } from './acompanhamento-sast-acao-dto';

export class AcompanhamentoSastIndicadorDto {
    private indicador: string;
    private diagnostico: string;
    private intervencao: string;
    private acoes: Array<AcompanhamentoSastAcaoDto>;
    
    getIndicador() {
        return this.indicador;
    }
    setIndicador(indicador) {
        this.indicador = indicador;
    }
    getDiagnostico() {
        return this.diagnostico;
    }
    setDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }
    getIntervencao() {
        return this.intervencao;
    }
    setIntervencao(intervencao) {
        this.intervencao = intervencao;
    }
    getAcoes() {
        return this.acoes;
    }
    setAcoes(acoes) {
        this.acoes = acoes;
    }
    
}
