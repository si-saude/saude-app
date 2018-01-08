import { ResultadoExame } from './resultado-exame';

export class ItemResultadoExame {
    private id: number;
    private resultadoExame: ResultadoExame;
    private codigo: string;
    private titulo: string;
    private resultado: string;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getResultadoExame() {
        return this.resultadoExame;
    }

    setResultadoExame(resultadoExame: ResultadoExame) {
        this.resultadoExame = resultadoExame;
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

    getResultado() {
        return this.resultado;
    }

    setResultado(resultado: string) {
        this.resultado = resultado;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}