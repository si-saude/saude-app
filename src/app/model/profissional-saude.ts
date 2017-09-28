import { DateFilter } from './../generics/date.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { GerenciaFilter } from './../controller/gerencia/gerencia.filter';
import { Endereco } from './endereco';
import { Telefone } from './telefone';


export class ProfissionalSaude {
    id: number;
    version: number;
    nome: string;
    dataNascimento: DateFilter;
    matricula: string;
    chave: string;
    ramal: string;
    localizacao: LocalizacaoFilter;
    equipe: EquipeFilter;
    gerencia: GerenciaFilter;
    mi: string;
    enderecos: Array<Endereco>;
    telefones: Array<Telefone>;

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