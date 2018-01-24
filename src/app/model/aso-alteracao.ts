import { Aso } from './aso';
import { Usuario } from './usuario';

export class AsoAlteracao {
    private id: number;
    private aso: Aso;
    private usuario: Usuario;
    private status: string;
    private data: Date;
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

    getUsuario() {
        return this.usuario;
    }

    setUsuario(usuario: Usuario) {
        this.usuario = usuario;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getData() {
        return this.data;
    }

    setData(data: Date) {
        this.data = data;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
