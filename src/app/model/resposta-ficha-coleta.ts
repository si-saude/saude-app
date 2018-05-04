import { PerguntaFichaColeta } from './pergunta-ficha-coleta';
import { FichaColeta } from './ficha-coleta';
import { ItemRespostaFichaColeta } from './item-resposta-ficha-coleta';

export class RespostaFichaColeta {
    private id: number;
    private pergunta: PerguntaFichaColeta;
    private ficha: FichaColeta;
    private conteudo: string = "";
    private itens: Array<ItemRespostaFichaColeta>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getPergunta() {
        return this.pergunta;
    }

    setPergunta(pergunta: PerguntaFichaColeta) {
        this.pergunta = pergunta;
    }

    getFicha() {
        return this.ficha;
    }

    setFicha(ficha: FichaColeta) {
        this.ficha = ficha;
    }

    getConteudo() {
        return this.conteudo;
    }

    setConteudo(conteudo: string) {
        this.conteudo = conteudo;
    }

    getItens() {
        return this.itens;
    }

    setItens(itens: Array<ItemRespostaFichaColeta>) {
        this.itens = itens;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
