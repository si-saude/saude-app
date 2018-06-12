import { Empregado } from './empregado';
import { Vacina } from './vacina';
import { CustomDate} from './../generics/utils/custom-date.util';

export class EmpregadoVacina {
    private id: number;
    private empregado: Empregado;
    private vacina: Vacina;
    private data: Date;
    private lote: string;
    private laboratorio: string;
    private dose: number;
    private proximaDose: Date;
    private version: number;
    
    private dataCustomDate: CustomDate = new CustomDate(this.data);
    private proximaDoseCustomDate: CustomDate = new CustomDate(this.proximaDose);

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }
    
    getVacina() {
        return this.vacina;
    }
    
    setVacina(vacina: Vacina) {
        this.vacina = vacina;
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
    
    getLote() {
        return this.lote;
    }
    
    setLote(lote: string) {
        this.lote = lote;
    }
    
    getLaboratorio() {
        return this.laboratorio;
    }
    
    setLaboratorio(laboratorio: string) {
        this.laboratorio = laboratorio;
    }
    
    getDose() {
        return this.dose;
    }
    
    setDose(dose: number) {
        this.dose = dose;
    }
    
    getProximaDose() {
        this.proximaDose = this.proximaDoseCustomDate.getApiDate();
        return this.proximaDose;
    }
    
    setProximaDose(proximaDose: Date) {
        this.proximaDoseCustomDate.setApiDate(proximaDose);
        this.proximaDose = proximaDose;
    }
    
    getProximaDoseCustomDate(){
        return this.proximaDoseCustomDate;
    }
    
    setProximaDoseCustomDate(proximaDoseCustomDate: CustomDate){
        this.proximaDoseCustomDate = proximaDoseCustomDate;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
       
}