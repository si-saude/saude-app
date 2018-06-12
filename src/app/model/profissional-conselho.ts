import { Profissional } from './profissional';
import { CustomDate} from './../generics/utils/custom-date.util';

export class ProfissionalConselho {
    private id: number = 0;
    private conselho: string;
    private uf: string;
    private numero: string;
    private vencimento: Date;
    private profissional: Profissional;
    private version:number;

    private vencimentoCustomDate: CustomDate = new CustomDate(this.vencimento);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getConselho() {
        return this.conselho;
    }

    setConselho(conselho: string) {
        this.conselho = conselho;
    }

    getUf() {
        return this.uf;
    }

    setUf(uf: string) {
        this.uf = uf;
    }

    getNumero() {
        return this.numero;
    }

    setNumero(numero: string) {
        this.numero = numero;
    }

    getVencimento() {
        this.vencimento = this.vencimentoCustomDate.getApiDate();
        return this.vencimento;
    }
    
    setVencimento(vencimento: Date) {
        this.vencimentoCustomDate.setApiDate(vencimento);
        this.vencimento = vencimento;
    }
    
    getVencimentoCustomDate(){
        return this.vencimentoCustomDate;
    }
    
    setVencimentoCustomDate(vencimentoCustomDate: CustomDate){
        this.vencimentoCustomDate = vencimentoCustomDate;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}