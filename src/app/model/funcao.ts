import { Vacina } from './vacina';

export class Funcao {
    private id: number = 0;
    private nome: string;
    private version: number;
    private vacinas: Array<Vacina>;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getNome() {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getVacinas():Array<Vacina>{
        return this.vacinas;
    }
    
    setVacinas(vacinas:Array<Vacina>){
        this.vacinas = vacinas;
    }
    
}