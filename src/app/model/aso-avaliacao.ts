import { Aso } from './aso';

export class AsoAvaliacao {
    private id: number;
    private aso: Aso;
    private descricao: string;
    private conforme: boolean;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
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
    getConforme() {
        return this.conforme;
    }

    setConforme(conforme: boolean) {
        this.conforme = conforme;
    }
    
}
