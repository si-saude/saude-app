import { ResultadoExameFilter } from './../resultado-exame/resultado-exame.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class ItemResultadoExameFilter extends GenericFilter {
    private resultadoExame: ResultadoExameFilter = new ResultadoExameFilter();
    private titulo: string;
    private resultado: string;
    
    getResultadoExame() {
        return this.resultadoExame;
    }
    setResultadoExame(resultadoExame: ResultadoExameFilter) {
        this.resultadoExame = resultadoExame;
    }
    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    getResultado() {
        return this.resultado;
    }
    setResultado(resultado: string) {
        this.resultado = resultado;
    }
}