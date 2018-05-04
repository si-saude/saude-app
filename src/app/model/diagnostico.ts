import { Eixo } from './eixo';

export class Diagnostico {
    private id: number;
    private codigo: string;
    private descricao: string;
    private inativo: boolean;
    private eixo: Eixo;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    isInativo() {
        return this.inativo;
    }

    setInativo(inativo: boolean) {
        this.inativo = inativo;
    }

    getEixo() {
        return this.eixo;
    }

    setEixo(eixo: Eixo) {
        this.eixo = eixo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
        
}
