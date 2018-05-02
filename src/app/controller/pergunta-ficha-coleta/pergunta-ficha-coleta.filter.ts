import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class PerguntaFichaColetaFilter extends GenericFilter {
    private grupo: string;
    private tipo: string;
    private codigo: string;
    private path: string;
    private inativo: BooleanFilter;

    getGrupo() {
        return this.grupo;
    }

    setGrupo(grupo: string) {
        this.grupo = grupo;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo: string) {
        this.tipo = tipo;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    isInativo() {
        return this.inativo;
    }

    setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }
    
    getPath() {
        return this.path;
    }

    setPath(path: string) {
        this.path = path;
    }

}
