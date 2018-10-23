import { IndicadorConhecimentoAlimentar } from './indicador-conhecimento-alimentar';

export class ItemIndicadorConhecimentoAlimentar {
    private id: number;
    private indicadorConhecimentoAlimentar: IndicadorConhecimentoAlimentar;
    private descricao: string;
    private ordem: number;
    private version: number;
    
    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
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

    getIndicadorConhecimentoAlimentar() {
        return this.indicadorConhecimentoAlimentar;
    }

    setIndicadorConhecimentoAlimentar(indicadorConhecimentoAlimentar) {
        this.indicadorConhecimentoAlimentar = indicadorConhecimentoAlimentar;
    }
    
    getOrdem() {
        return this.ordem;
    }

    setOrdem(ordem) {
        this.ordem = ordem;
    }
    
}
