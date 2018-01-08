import { Exame } from './exame';

export class CampoExame {
    private id: number;
    private exame: Exame;
    private codigo: string;
    private titulo: string;
    private numeroLinhas: number;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getExame() {
        return this.exame;
    }

    setExame(exame: Exame) {
        this.exame = exame;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    getNumeroLinhas() {
        return this.numeroLinhas;
    }

    setNumeroLinhas(numeroLinhas: number) {
        this.numeroLinhas = numeroLinhas;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo: string) {
        this.titulo = titulo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}