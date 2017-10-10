import { ProfissionalSaude } from './profissional-saude';
import { Vacina } from './vacina';

export class ProfissionalVacina {
    private id: number;
    private profissional: ProfissionalSaude;
    private vacina: Vacina;
    private data: Date;
    private lote: string;
    private laboratorio: string;
    private dose: number;
    private proximaDose: Date;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: ProfissionalSaude) {
        this.profissional = profissional;
    }

    getVacina() {
        return this.vacina;
    }

    setVacina(vacina: Vacina) {
        this.vacina = vacina;
    }

    getData() {
        return this.data;
    }

    setData(data: Date) {
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

    setProximaDose(proximaDose: Date) {
        this.proximaDose = proximaDose;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
