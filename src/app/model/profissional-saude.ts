import { DateFilter } from './../generics/date.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { GerenciaFilter } from './../controller/gerencia/gerencia.filter';
import { Endereco } from './endereco';
import { Telefone } from './telefone';
import { Funcao } from './funcao';
import { Localizacao } from './localizacao';
import { Equipe } from './equipe';
import { ProfissionalConselho } from './profissional-conselho';
import { Curriculo } from './curriculo';


export class ProfissionalSaude {
    id: number;
    version: number;
    nome: string;
    private dataNascimento: Date;
    matricula: string;
    chave: string;
    ramal: string;
    localizacao: Localizacao;
    equipe: Equipe;
    funcao: Funcao;
    mi: string;
    endereco: Endereco;
    telefones: Array<Telefone>;
    curriculo: Curriculo;
    profissionalConselho: ProfissionalConselho;

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

    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
    getDataNascimento() {
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: Date) {
        this.dataNascimento = dN;
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
    
    setLocalizacao(l: Localizacao) {
        this.localizacao= l;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(e: Equipe) {
        this.equipe= e;
    }
    
    getFuncao() {
        return this.funcao;
    }
    
    setFuncao(f: Funcao) {
        this.funcao= f;
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
    
    getEndereco() {
        return this.endereco;
    }
    
    setEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }
    

}