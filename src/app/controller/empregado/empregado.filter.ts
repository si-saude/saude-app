import { GenericFilter } from './../../generics/generic.filter';
import { CargoFilter } from './../cargo/cargo.filter';
import { FuncaoFilter } from './../funcao/funcao.filter';
import { RegimeFilter } from './../regime/regime.filter';
import { GerenciaFilter } from '../gerencia/gerencia.filter';
import { BaseFilter } from './../base/base.filter';
import { GheFilter } from './../ghe/ghe.filter';
import { GheeFilter } from './../ghee/ghee.filter';
import { DateFilter } from './../../generics/date.filter';

export class EmpregadoFilter extends GenericFilter {
    private nome:string;
    private cpf:string;
    private dataNascimento: DateFilter = new DateFilter();
    private chave: string;
    private matricula: string;
    private rg: string;
    private sexo: string;
    private ramal: string;
    private status: string;
    private cargo: CargoFilter;
    private funcao: FuncaoFilter;
    private regime: RegimeFilter;
    private gerencia: GerenciaFilter;
    private base: BaseFilter;
    private ghe: GheFilter;
    private ghee: GheeFilter;
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getCpf():string{
        return this.cpf;
    }
    
    setCpf(cpf:string){
        this.cpf = cpf;
    }
    
    getDataNascimento():DateFilter{
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: DateFilter){
        this.dataNascimento = dN;
    }
    
    getChave(): string{
        return this.chave;
    }
    
    setChave(chave: string){
        this.chave = chave;
    }
    
    getMatricula(): string{
        return this.matricula;
    }
    
    setMatricula(matricula: string){
        this.matricula = matricula;
    }
    
    getRg(): string{
        return this.rg;
    }
    
    setRg(rg: string){
        this.rg = rg;
    }
    
    getSexo(): string{
        return this.sexo;
    }
    
    setSexo(sexo: string){
        this.sexo = sexo;
    }
    
    getRamal(): string{
        return this.ramal;
    }
    
    setRamal(ramal: string){
        this.ramal = ramal;
    }
    
    getStatus(): string{
        return this.status;
    }
    
    setStatus(status: string){
        this.status = status;
    }
    
    getCargo(): CargoFilter{
        return this.cargo;
    }
    
    setCargo(cargo: CargoFilter){
        this.cargo = cargo;
    }
    
    getFuncao(): FuncaoFilter{
        return this.funcao;
    }
    
    setFuncao(funcao: FuncaoFilter){
        this.funcao = funcao;
    }
    
    getRegime(): RegimeFilter{
        return this.regime;
    }
    
    setRegime(regime: RegimeFilter){
        this.regime = regime;
    }
    
    getGerencia(): GerenciaFilter{
        return this.gerencia;
    }
    
    setGerencia(gerencia: GerenciaFilter){
        this.gerencia = gerencia;
    }
    
    getBase(): BaseFilter{
        return this.base;
    }
    
    setBase(base: BaseFilter){
        this.base = base;
    }
    
    getGhe(): GheFilter{
        return this.ghe;
    }
    
    setGhe(ghe: GheFilter){
        this.ghe = ghe;
    }
    
    getGhee(): GheeFilter{
        return this.ghee;
    }
    
    setGhee(ghee: GheeFilter){
        this.ghee = ghee;
    }
       
}