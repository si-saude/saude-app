import { RespostaFichaColeta } from './resposta-ficha-coleta';

export class FichaColeta {
    private id: number;
    private respostaFichaColetas: Array<RespostaFichaColeta>;
    private version: number;
    
    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getRespostaFichaColetas() {
        return this.respostaFichaColetas;
    }

    setRespostaFichaColetas(respostaFichaColetas: Array<RespostaFichaColeta>) {
        this.respostaFichaColetas = respostaFichaColetas;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
