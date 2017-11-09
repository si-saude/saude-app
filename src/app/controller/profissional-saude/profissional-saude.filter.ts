import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { CargoFilter } from './../cargo/cargo.filter';
import { CurriculoFilter } from './../curriculo/curriculo.filter';
import { ProfissionalConselhoFilter } from './../profissional-conselho/profissional-conselho.filter';
import { EnderecoFilter } from './../endereco/endereco.filter';

export class ProfissionalSaudeFilter extends GenericFilter {
    private empregado: EmpregadoFilter;
    private dataAso: DateFilter;
    private localizacao: LocalizacaoFilter;
    private equipe: EquipeFilter;
    private curriculo: CurriculoFilter;
    private profissionalConselho: ProfissionalConselhoFilter;
    private mi: string;

    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    
    getDataAso() {
        return this.dataAso;
    }
    
    setDataAso(dA: DateFilter) {
        this.dataAso = dA;
    }
    
    getLocalizacao() {
        return this.localizacao;
    }
    
    setLocalizacao(l: LocalizacaoFilter) {
        this.localizacao= l;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(e: EquipeFilter) {
        this.equipe= e;
    }
    
    getCurriculo() {
        return this.curriculo;
    }
    
    setCurriculo(curriculo: CurriculoFilter) {
        this.curriculo = curriculo;
    }
    
    getProfissionalConselho() {
        return this.profissionalConselho;
    }
    
    setProfissionalConselho(profissionalConselho: ProfissionalConselhoFilter) {
        this.profissionalConselho = profissionalConselho;
    }
    
    getMi() {
        return this.mi;
    }
    
    setMi(mi: string) {
        this.mi = mi;
    }
       
}