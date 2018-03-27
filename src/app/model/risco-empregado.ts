import { Empregado } from './empregado';
import { Equipe } from './equipe';
import { Triagem } from './triagem';

export class RiscoEmpregado {
    private id: number;
    private valor: number;
    private empregado: Empregado;
    private equipe: Equipe;
    private triagens: Array<Triagem>;
    private version: number;
    private data: Date;
    private status: string;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor: number) {
        this.valor = valor;
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

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    getData(){
        return this.data;
    }
    
    setData(data:Date){
        this.data = data;
    }
    
    getStatus(){
        return this.status;
    }
    setStatus(status:string){
        this.status = status;
    }
}
