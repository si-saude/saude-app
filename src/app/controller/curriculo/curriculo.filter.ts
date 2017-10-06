import { GenericFilter } from './../../generics/generic.filter';

export class CurriculoFilter extends GenericFilter {

    private historico: string;
    private formacao: string;
    private atuacao: string;
    
    getHistorico() {
        return this.historico;
    }

    setHistorico(historico: string) {
        this.historico = historico;
    }
    
    getFormacao() {
        return this.formacao;
    }
    
    setFormacao(formacao: string) {
        this.formacao = formacao;
    }
    
    getAtuacao() {
        return this.atuacao;
    }
    
    setAtuacao(atuacao: string) {
        this.atuacao = atuacao;
    }
    
}
