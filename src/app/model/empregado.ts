import { Cargo } from './cargo';
import { Funcao } from './funcao';
import { Regime } from './regime';
import { Gerencia } from './gerencia';
import { Base } from './base';
import { Ghe } from './ghe';
import { Ghee } from './ghee';
import { Instalacao } from './instalacao';
import { Telefone } from './telefone';
import { EmpregadoVacina } from './empregado-vacina';
import { GrupoMonitoramento } from './grupo-monitoramento';
import { HistoricoGrupoMonitoramento } from './historico-grupo-monitoramento';

export class Empregado{
    private id: number = 0;
    private nome:string;
    private cpf:string;
    private dataNascimento:Date;
    private chave: string;
    private matricula: string;
    private rg: string;
    private sexo: string = "";
    private ramal: string;
    private status: string = "";
    private cargo: Cargo;
    private funcao: Funcao;
    private regime: Regime;
    private gerencia: Gerencia;
    private base: Base;
    private ghe: Ghe;
    private ghee: Ghee;
    private instalacoes: Array<Instalacao>;
    private telefones: Array<Telefone>;
    private empregadoVacinas: Array<EmpregadoVacina>;
    private grupoMonitoramentos: Array<GrupoMonitoramento>;
    private historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>;
    private version: number;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
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
    
    getDataNascimento():Date{
        return this.dataNascimento;
    }
    
    setDataNascimento(dN: Date){
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
    
    getCargo(): Cargo{
        return this.cargo;
    }
    
    setCargo(cargo: Cargo){
        this.cargo = cargo;
    }
    
    getFuncao(): Funcao{
        return this.funcao;
    }
    
    setFuncao(funcao: Funcao){
        this.funcao = funcao;
    }
    
    getRegime(): Regime{
        return this.regime;
    }
    
    setRegime(regime: Regime){
        this.regime = regime;
    }
    
    getGerencia(): Gerencia{
        return this.gerencia;
    }
    
    setGerencia(gerencia: Gerencia){
        this.gerencia = gerencia;
    }
    
    getBase(): Base{
        return this.base;
    }
    
    setBase(base: Base){
        this.base = base;
    }
    
    getGhe(): Ghe{
        return this.ghe;
    }
    
    setGhe(ghe: Ghe){
        this.ghe = ghe;
    }
    
    getGhee(): Ghee{
        return this.ghee;
    }
    
    setGhee(ghee: Ghee){
        this.ghee = ghee;
    }
    
    getInstalacoes(): Array<Instalacao>{
        return this.instalacoes;
    }
    
    setInstalacoes(instalacoes: Array<Instalacao>){
        this.instalacoes = instalacoes;
    }
    
    getTelefones(): Array<Telefone>{
        return this.telefones;
    }
    
    setTelefones(telefones: Array<Telefone>){
        this.telefones = telefones;
    }
    
    getEmpregadoVacinas(): Array<EmpregadoVacina>{
        return this.empregadoVacinas;
    }
    
    setEmpregadoVacinas(empregadoVacinas: Array<EmpregadoVacina>){
        this.empregadoVacinas = empregadoVacinas;
    }
    
    getGrupoMonitoramentos(): Array<GrupoMonitoramento>{
        return this.grupoMonitoramentos;
    }
    
    setGrupoMonitoramentos(grupoMonitoramentos: Array<GrupoMonitoramento>){
        this.grupoMonitoramentos = grupoMonitoramentos;
    }
    
    getHistoricoGrupoMonitoramentos(): Array<HistoricoGrupoMonitoramento>{
        return this.historicoGrupoMonitoramentos;
    }
    
    setHistoricoGrupoMonitoramentos(historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>){
        this.historicoGrupoMonitoramentos = historicoGrupoMonitoramentos;
    }
    
}