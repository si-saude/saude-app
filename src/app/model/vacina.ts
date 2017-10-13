import { ProfissionalVacina } from './profissional-vacina';

export class Vacina {
    private id: number = 0;
    private descricao: string;
    private doses: number;
    private reforco: number;
    private profissionalVacinas: Array<ProfissionalVacina>;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getDescricao() {
        return this.descricao;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getDoses() {
        return this.doses;
    }
    
    setDoses(doses: number) {
        this.doses = doses;
    }
    
    getReforco() {
        return this.reforco;
    }
    
    setReforco(reforco: number) {
        this.reforco = reforco;
    }
    
    getProfissionalVacinas() {
        return this.profissionalVacinas;
    }
    
    setProfissionalVacinas(profissionalVacinas: Array<ProfissionalVacina>) {
        this.profissionalVacinas = profissionalVacinas;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}