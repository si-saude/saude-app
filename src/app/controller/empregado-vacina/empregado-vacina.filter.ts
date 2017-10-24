import { EmpregadoFilter } from './../empregado/empregado.filter';
import { VacinaFilter } from './../vacina/vacina.filter';
import { DateFilter } from './../../generics/date.filter';

export class EmpregadoVacina {
    private id: number;
    private empregado: EmpregadoFilter;
    private vacina: VacinaFilter;
    private data: DateFilter;
    private lote: string;
    private laboratorio: string;
    private dose: number;
    private proximaDose: DateFilter;
    private version: number;
    
    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    
    getVacina() {
        return this.vacina;
    }
    
    setVacina(vacina: VacinaFilter) {
        this.vacina = vacina;
    }

    getData() {
        return this.data;
    }
    
    setData(data: DateFilter) {
        this.data = data;
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
        return this.proximaDose;
    }
    
    setProximaDose(proximaDose: DateFilter) {
        this.proximaDose = proximaDose;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
       
}