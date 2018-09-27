import { Atestado } from './atestado';
import { ItemAuditoriaAtestado } from './item-auditoria-atestado';

export class AuditoriaAtestado {
    private id: number;
    private atestado: Atestado;
    private itemAuditoriaAtestado: ItemAuditoriaAtestado;
    private conforme: boolean;
    private version: number;

    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getAtestado() {
        return this.atestado;
    }
    public setAtestado(atestado) {
        this.atestado = atestado;
    }
    public getItemAuditoriaAtestado() {
        return this.itemAuditoriaAtestado;
    }
    public setItemAuditoriaAtestado(itemAuditoriaAtestado) {
        this.itemAuditoriaAtestado = itemAuditoriaAtestado;
    }
    public getConforme() {
        return this.conforme;
    }
    public setConforme(conforme) {
        this.conforme = conforme;
    }
    public getVersion() {
        return this.version;
    }
    public setVersion(version) {
        this.version = version;
    }
    
}