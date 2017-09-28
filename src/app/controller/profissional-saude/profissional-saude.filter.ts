import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { GerenciaFilter } from './../gerencia/gerencia.filter';

export class ProfissionalSaudeFilter extends GenericFilter {
    nome: string;
    dataNascimento: DateFilter;
    matricula: string;
    chave: string;
    ramal: string;
    localizacao: LocalizacaoFilter;
    equipe: EquipeFilter;
    gerencia: GerenciaFilter;
    mi: string;

    constructor() {
        super();
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
    
    setDataNascimento(dN: DateFilter) {
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
    
    setLocalizacao(l: LocalizacaoFilter) {
        this.localizacao= l;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(e: EquipeFilter) {
        this.equipe= e;
    }
    
    getGerencia() {
        return this.gerencia;
    }
    
    setGerencia(g: GerenciaFilter) {
        this.gerencia = g;
    }
    
    getMi() {
        return this.mi;
    }
    
    setMi(mi: string) {
        this.mi = mi;
    }
       
}