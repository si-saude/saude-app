import { Alimento } from './alimento';
import { MedidaAlimentar } from './medida-alimentar';

export class AlimentoMedidaAlimentar {
    private id: number;
    private alimento: Alimento;
    private medidaAlimentar: MedidaAlimentar;
    private referencia: string;
    private quantidade: number;
    private version: number;
    
    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getVersion() {
        return this.version;
    }
    public setVersion(version) {
        this.version = version;
    }
    public getAlimento() {
        return this.alimento;
    }
    public setAlimento(alimento) {
        this.alimento = alimento;
    }
    public getMedidaAlimentar() {
        return this.medidaAlimentar;
    }
    public setMedidaAlimentar(medidaAlimentar) {
        this.medidaAlimentar = medidaAlimentar;
    }
    public getReferencia() {
        return this.referencia;
    }
    public setReferencia(referencia) {
        this.referencia = referencia;
    }
    public getQuantidade() {
        return this.quantidade;
    }
    public setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    
}
