import { ItemPerguntaFichaColeta } from './item-pergunta-ficha-coleta';
import { Equipe } from './equipe';

export class PerguntaFichaColeta {
    private id: number;
    private grupo: string = "";
    private tipo: string = "";
    private codigo: string;
    private inativo: boolean;
    private descricao: string;
    private quantidadeDeItens: number;
    private ordem: number;
    private itens: Array<ItemPerguntaFichaColeta>;
    private equipes: Array<Equipe>;
    private path: string;
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
    
    getOrdem() {
        return this.ordem;
    }
    
    setOrdem(ordem: number) {
        this.ordem = ordem;
    }
    
    getEquipes() {
        return this.equipes;
    }
    
    setEquipes(equipes: Array<Equipe>) {
        this.equipes = equipes;
    }
    
    getPath() {
        return this.path;
    }
    
    setPath(path: string) {
        this.path = path;
    }
    
}
