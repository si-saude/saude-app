import { Empresa } from './empresa';

export class Cnae {
    private id: number;
    private codigo: string;
    private empresa: Empresa;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo) {
        this.codigo = codigo;
    }

    getEmpresa() {
        return this.empresa;
    }

    setEmpresa(empresa) {
        this.empresa = empresa;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
    
}
