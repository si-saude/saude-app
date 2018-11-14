import { Aso } from './aso';

export class ItemAuditoriaAso {
    private id: number;
    private aso: Aso;
    private conforme: boolean;
    private descricao: string;
    private ordem: number;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getOrdem() {
        return this.ordem;
    }

    setOrdem(ordem: number) {
        this.ordem = ordem;
    }
    
    getConforme() {
        return this.conforme;
    }
    
    setConforme( conforme: boolean ) {
        this.conforme = conforme;
    }

    getAso() {
        return this.aso;
    }

    setAso(aso: Aso) {
        this.aso = aso;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
