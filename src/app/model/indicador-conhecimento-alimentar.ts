import { ItemIndicadorConhecimentoAlimentar } from './item-indicador-conhecimento-alimentar';

export class IndicadorConhecimentoAlimentar {
    private id: number;
    private enunciado: string;
    private ordem: number;
    private itemIndicadorConhecimentoAlimentares: Array<ItemIndicadorConhecimentoAlimentar>;
    private inativo: boolean;
    private version: number;
    
    getEnunciado() {
        return this.enunciado;
    }

    setEnunciado(enunciado) {
        this.enunciado = enunciado;
    }

    getOrdem() {
        return this.ordem;
    }

    setOrdem(ordem) {
        this.ordem = ordem;
    }

    getItemIndicadorConhecimentoAlimentares() {
        return this.itemIndicadorConhecimentoAlimentares;
    }

    setItemIndicadorConhecimentoAlimentares(itemIndicadorConhecimentoAlimentares) {
        this.itemIndicadorConhecimentoAlimentares = itemIndicadorConhecimentoAlimentares;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
    
    getInativo() {
        return this.inativo;
    }

    setInativo(inativo) {
        this.inativo = inativo;
    }
}
