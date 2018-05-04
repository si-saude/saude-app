import { IndicadorSast } from './indicador-sast';

export class IndicadorAssociadoSast {
    private id: number;
    private indicadorSast: IndicadorSast;
    private codigo: string;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getIndicadorSast() {
        return this.indicadorSast;
    }

    setIndicadorSast(indicadorSast: IndicadorSast) {
        this.indicadorSast = indicadorSast;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
