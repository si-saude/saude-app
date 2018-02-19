import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';

export class FilaAtendimentoOcupacionalFilter extends GenericFilter {
    profissional: ProfissionalSaudeFilter;
    localizacao: LocalizacaoFilter;
    inicio: DateFilter;
    atualizacao: DateFilter;
    fim: DateFilter;
    status: string;
    
    getProfissional() {
        return this.profissional;
    }
    setProfissional(profissional: ProfissionalSaudeFilter) {
        this.profissional = profissional;
    }
    getLocalizacao() {
        return this.localizacao;
    }
    setLocalizacao(localizacao: LocalizacaoFilter) {
        this.localizacao = localizacao;
    }
    getInicio() {
        return this.inicio;
    }
    setInicio(inicio: DateFilter) {
        this.inicio = inicio;
    }
    getAtualizacao() {
        return this.atualizacao;
    }
    setAtualizacao(atualizacao: DateFilter) {
        this.atualizacao = atualizacao;
    }
    getFim() {
        return this.fim;
    }
    setFim(fim: DateFilter) {
        this.fim = fim;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
}
