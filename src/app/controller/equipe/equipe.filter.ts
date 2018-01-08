import { GenericFilter } from './../../generics/generic.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';

export class EquipeFilter extends GenericFilter {
    private nome: string;
    private abreviacao: string;
    private coordenador: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getAbreviacao() {
        return this.abreviacao;
    }
    
    public setAbreviacao(abreviacao: string) {
        this.abreviacao = abreviacao;
    }
    
    getCoordenador() {
        return this.coordenador;
    }
    
    setCoordenador(coordenador: ProfissionalSaudeFilter) {
        this.coordenador = coordenador;
    }
    
}