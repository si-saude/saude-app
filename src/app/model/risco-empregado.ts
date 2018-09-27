import { Empregado } from './empregado';
import { Equipe } from './equipe';
import { Triagem } from './triagem';
import { Profissional } from './profissional';
import { RiscoPotencial } from './risco-potencial';
import { CustomDate} from './../generics/utils/custom-date.util';

export class RiscoEmpregado {
    private id: number;
    private valor: number;
    private valorPonderado: number;
    private riscoPotencial: RiscoPotencial;
    private empregado: Empregado;
    private equipe: Equipe;
    private triagens: Array<Triagem>;
    private profissional: Profissional;
    private version: number;
    private data: Date;
    private status: string;
    private statusRPSat: string;
    private ativo: boolean;

    private dataCustomDate: CustomDate = new CustomDate(this.data);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getValorPonderado() {
        return this.valorPonderado;
    }

    setValorPonderado(valorPonderado: number) {
        this.valorPonderado = valorPonderado;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor: number) {
        this.valor = valor;
    }
    
    getRiscoPotencial() {
        return this.riscoPotencial;
    }

    setRiscoPotencial(riscoPotencial: RiscoPotencial) {
        this.riscoPotencial = riscoPotencial;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getTriagens() {
        return this.triagens;
    }

    setTriagens(triagens: Array<Triagem>) {
        this.triagens = triagens;
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

    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }
    
    getDataCustomDate(){
        return this.dataCustomDate;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
    
    getStatus(){
        return this.status;
    }
    
    setStatus(status:string){
        this.status = status;
    }
    
    setStatusRPSat(statusRPSat: string) {
        this.statusRPSat = statusRPSat;
    }
    
    getStatusRPSat() {
        return this.statusRPSat;
    }
    
    setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }
    
    getAtivo() {
        return this.ativo;
    }
}
