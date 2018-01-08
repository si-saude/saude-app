import { ExameFilter } from './../exame/exame.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class CampoExameFilter extends GenericFilter {
    private exame: ExameFilter = new ExameFilter();
    private codigo: string;
    private titulo: string;
    private numeroLinhas: number;
    
    getExame() {
        return this.exame;
    }
    setExame(exame: ExameFilter) {
        this.exame = exame;
    }
    getCodigo() {
        return this.codigo;
    }
    setCodigo(codigo: string) {
        this.codigo = codigo;
    }
    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    getNumeroLinhas() {
        return this.numeroLinhas;
    }
    setNumeroLinhas(numeroLinhas: number) {
        this.numeroLinhas = numeroLinhas;
    }
}