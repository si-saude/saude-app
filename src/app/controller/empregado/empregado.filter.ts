import { GenericFilter } from './../../generics/generic.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';
import { CargoFilter } from './../cargo/cargo.filter';
import { FuncaoFilter } from './../funcao/funcao.filter';
import { RegimeFilter } from './../regime/regime.filter';
import { GerenciaFilter } from '../gerencia/gerencia.filter';
import { BaseFilter } from './../base/base.filter';
import { GheFilter } from './../ghe/ghe.filter';
import { GheeFilter } from './../ghee/ghee.filter';

export class EmpregadoFilter extends GenericFilter {
    private chave: string;
    private matricula: string;
    private ramal: string;
    private status: string;
    private escolaridade: string;
    private vinculo: string;
    private pessoa: PessoaFilter = new PessoaFilter();
    private cargo: CargoFilter;
    private funcao: FuncaoFilter;
    private regime: RegimeFilter;
    private gerencia: GerenciaFilter;
    private base: BaseFilter;
    private ghe: GheFilter;
    private ghee: GheeFilter;

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
    
    getEscolaridade(): string{
        return this.escolaridade;
    }
    
    setEscolaridade(escolaridade: string){
        this.escolaridade = escolaridade;
    }
    
    getVinculo(): string{
        return this.vinculo;
    }
    
    setVinculo(vinculo: string){
        this.vinculo = vinculo;
    }
    
    getPessoa(): PessoaFilter {
        return this.pessoa;
    }
    
    setPessoa(pessoa: PessoaFilter) {
        this.pessoa = pessoa;
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