import { ItemRefeicao } from './item-refeicao';
import { Recordatorio } from './recordatorio';

export class Refeicao {
    private id: number;
    private nome: string;
    private itens: Array<ItemRefeicao>;
    private recordatorio: Recordatorio;
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

    public getRecordatorio() {
        return this.recordatorio;
    }

    public setRecordatorio(recordatorio) {
        this.recordatorio = recordatorio;
    }
    
    public getSomatorio(){
        return this.somatorio;
    }
    
    public setSomatorio(somatorio){
        this.somatorio = somatorio;
    }
}
