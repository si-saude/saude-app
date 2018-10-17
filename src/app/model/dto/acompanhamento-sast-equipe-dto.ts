import { AcompanhamentoSastIndicadorDto } from './acompanhamento-sast-indicador-dto';

export class AcompanhamentoSastEquipeDto {
    private nome: string;
    private indicadores: Array<AcompanhamentoSastIndicadorDto>;
    
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getIndicadores() {
        return this.indicadores;
    }
    setIndicadores(indicadores) {
        this.indicadores = indicadores;
    }
    
}
