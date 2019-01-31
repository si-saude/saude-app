import { ItemRefeicaoPlano } from './item-refeicao-plano';
import { PlanoAlimentar } from './plano-alimentar';

export class RefeicaoPlano {
    private id: number;
    private nome: string;
    private itens: Array<ItemRefeicaoPlano>;
    private planoAlimentar: PlanoAlimentar;
    private version: number;
    private somatorio:number = 0;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getNome() {
        return this.nome;
    }

    public setNome(nome) {
        this.nome = nome;
    }

    public getItens() {
        return this.itens;
    }

    public setItens(itens) {
        this.itens = itens;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }

    public getPlanoAlimentar() {
        return this.planoAlimentar;
    }

    public setPlanoAlimentar(planoAlimentar) {
        this.planoAlimentar = planoAlimentar;
    }
    
    public getSomatorio(){
        return this.somatorio;
    }
    
    public setSomatorio(somatorio){
        this.somatorio = somatorio;
    }
}
