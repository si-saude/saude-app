import { Empregado } from './empregado';
import { Cargo } from './cargo';
import { Localizacao } from './localizacao';
import { Equipe } from './equipe';
import { ProfissionalConselho } from './profissional-conselho';
import { ProfissionalVacina } from './profissional-vacina';
import { Curriculo } from './curriculo';
import { Servico } from './servico';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Profissional {
    private id: number = 0;
    private empregado: Empregado;
    private dataAso: Date;
    private localizacao: Localizacao;
    private equipe: Equipe;
    private mi: string;
    private curriculo: Curriculo;
    private profissionalConselho: ProfissionalConselho;
    private profissionalVacinas: Array<ProfissionalVacina>;
    private servicos: Array<Servico>;
    private version: number;

    private dataAsoCustomDate: CustomDate = new CustomDate(this.dataAso);

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }

    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }
    
    getDataAso() {
        this.dataAso = this.dataAsoCustomDate.getApiDate();
        return this.dataAso;
    }
    
    setDataAso(dataAso: Date) {
        this.dataAsoCustomDate.setApiDate(dataAso);
        this.dataAso = dataAso;
    }
    
    getDataAsoCustomDate(){
        return this.dataAsoCustomDate;
    }
    
    setDataAsoCustomDate(dataAsoCustomDate: CustomDate){
        this.dataAsoCustomDate = dataAsoCustomDate;
    }
    
    getLocalizacao() {
        return this.localizacao;
    }
    
    setLocalizacao(l: Localizacao) {
        this.localizacao= l;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(e: Equipe) {
        this.equipe= e;
    }
    
    getMi() {
        return this.mi;
    }
    
    setMi(mi: string) {
        this.mi = mi;
    }
    
    getCurriculo() {
        return this.curriculo;
    }
    
    setCurriculo(curriculo: Curriculo) {
        this.curriculo = curriculo;
    }
    
    getProfissionalConselho() {
        return this.profissionalConselho;
    }
    
    setProfissionalConselho(profissionalConselho: ProfissionalConselho) {
        this.profissionalConselho = profissionalConselho;
    }
    
    getProfissionalVacinas() {
        return this.profissionalVacinas;
    }
    
    setProfissionalVacinas(profissionalVacinas: Array<ProfissionalVacina>) {
        this.profissionalVacinas = profissionalVacinas;
    }
    
    getServicos() {
        return this.servicos;
    }
    
    setServicos(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

}