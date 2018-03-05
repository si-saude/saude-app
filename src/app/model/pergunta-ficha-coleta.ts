import { ItemPerguntaFichaColeta } from './item-pergunta-ficha-coleta';

export class PerguntaFichaColeta {
    private id: number;
    private grupo: string = "";
    private tipo: string = "";
    private codigo: string;
    private inativo: boolean;
    private descricao: string;
    private quantidadeDeItens: number;
    private itens: Array<ItemPerguntaFichaColeta>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

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

    getInativo() {
        return this.inativo;
    }

    setInativo(inativo: boolean) {
        this.inativo = inativo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    getDescricao() {
        return this.descricao;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getQuantidadeDeItens() {
        return this.getItens().length;
    }
    
    getItens() {
        return this.itens;
    }

    setItens(itens: Array<ItemPerguntaFichaColeta>) {
        this.itens = itens;
    }    
}
