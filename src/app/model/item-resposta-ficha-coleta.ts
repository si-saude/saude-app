import { RespostaFichaColeta } from './resposta-ficha-coleta';

export class ItemRespostaFichaColeta {
    private id: number;
    private item: ItemRespostaFichaColeta;
    private resposta: RespostaFichaColeta;
    private conteudo: string = '';
    private version: number;
    private index: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getIndex() {
        return this.index;
    }

    setIndex(index: number) {
        this.index = index;
    }
    
    getResposta() {
        return this.resposta;
    }

    setResposta(resposta: RespostaFichaColeta) {
        this.resposta = resposta;
    }

    getItem() {
        return this.item;
    }

    setItem(item: ItemRespostaFichaColeta) {
        this.item = item;
    }

    getConteudo() {
        return this.conteudo;
    }

    setConteudo(conteudo: string) {
        this.conteudo = conteudo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
