import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { CargoFilter } from './../cargo/cargo.filter';
import { CurriculoFilter } from './../curriculo/curriculo.filter';
import { ProfissionalConselhoFilter } from './../profissional-conselho/profissional-conselho.filter';
import { EnderecoFilter } from './../endereco/endereco.filter';

export class ProfissionalSaudeFilter extends GenericFilter {
    private nome: string;
    private dataNascimento: DateFilter = new DateFilter();
    private dataAso: DateFilter;
    private matricula: string;
    private chave: string;
    private ramal: string;
    private localizacao: LocalizacaoFilter;
    private equipe: EquipeFilter;
    private cargo: CargoFilter;
    private curriculo: CurriculoFilter;
    private profissionalConselho: ProfissionalConselhoFilter;
    private endereco: EnderecoFilter;
    private mi: string;

    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
    getDataNascimento() {
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: DateFilter) {
        this.dataNascimento = dN;
    }
    
    getDataAso() {
        return this.dataAso;
    }
    
    setDataAso(dA: DateFilter) {
        this.dataAso = dA;
    }
    
    getMatricula() {
        return this.matricula;
    }
    
    setMatricula(m: string) {
        this.matricula = m;
    }
    
    getChave() {
        return this.chave;
    }
    
    setChave(c: string) {
        this.chave = c;
    }
    
    getRamal() {
        return this.ramal;
    }
    
    setRamal(r: string) {
        this.ramal = r;
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
    
    getCargo() {
        return this.cargo;
    }
    
    setCargo(cargo: CargoFilter) {
        this.cargo = cargo;
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
    
    getEndereco() {
        return this.endereco;
    }
    
    setEndereco(endereco: EnderecoFilter) {
        this.endereco = endereco;
    }
    
    getMi() {
        return this.mi;
    }
    
    setMi(mi: string) {
        this.mi = mi;
    }
       
}