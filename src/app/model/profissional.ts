import { Endereco } from './endereco';
import { Telefone } from './telefone';
import { Cargo } from './cargo';
import { Localizacao } from './localizacao';
import { Equipe } from './equipe';
import { ProfissionalConselho } from './profissional-conselho';
import { ProfissionalVacina } from './profissional-vacina';
import { Curriculo } from './curriculo';


export class Profissional {
    private id: number = 0;
    private nome: string;
    private dataNascimento: Date;
    private matricula: string;
    private chave: string;
    private ramal: string;
    private localizacao: Localizacao;
    private equipe: Equipe;
    private cargo: Cargo;
    private mi: string;
    private telefones: Array<Telefone>;
    private endereco: Endereco;
    private curriculo: Curriculo;
    private profissionalConselho: ProfissionalConselho;
    private profissionalVacinas: Array<ProfissionalVacina> ;
    private assinatura: any;
    private assinaturaBase64: string;
    private version: number;    

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
    
    getCargo() {
        return this.cargo;
    }
    
    setCargo(f: Cargo) {
        this.cargo = f;
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

    getTelefones() {
        return this.telefones;
    }
    
    setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones;
    }
    
    getEndereco() {
        return this.endereco;
    }
    
    setEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }
    
    getAssinatura():any{
        return this.assinatura;
    }
    
    setAssinatura(assinatura:any){
        this.assinatura = assinatura;
    }
    
    getAssinaturaBase64():string{
        return this.assinaturaBase64;
    }
    
    setAssinaturaBase64(a:string){
        this.assinaturaBase64 = a;
    }
}