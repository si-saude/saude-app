import { Cargo } from './cargo';
import { Pessoa } from './pessoa';
import { Funcao } from './funcao';
import { Regime } from './regime';
import { Gerencia } from './gerencia';
import { Base } from './base';
import { Ghe } from './ghe';
import { Ghee } from './ghee';
import { Endereco } from './endereco';
import { Instalacao } from './instalacao';
import { EmpregadoVacina } from './empregado-vacina';
import { GrupoMonitoramento } from './grupo-monitoramento';
import { HistoricoGrupoMonitoramento } from './historico-grupo-monitoramento';

export class Empregado {
    private id: number = 0;
    private chave: string;
    private matricula: string;
    private ramal: string;
    private status: string = "";
    private estadoCivil: string = "";
    private escolaridade: string = "";
    private vinculo: string = "";
    private pessoa: Pessoa;
    private cargo: Cargo;
    private funcao: Funcao;
    private regime: Regime;
    private gerencia: Gerencia;
    private base: Base;
    private ghe: Ghe;
    private ghee: Ghee;
    private instalacoes: Array<Instalacao>;
    private empregadoVacinas: Array<EmpregadoVacina>;
    private grupoMonitoramentos: Array<GrupoMonitoramento>;
    private historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>;
    private foto: any;
    private fotoBase64: string;
    private assinatura: any;
    private assinaturaBase64: string;
    private pis: string;
    private dataAdmissao: Date;
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
    
    getEstadoCivil(): string{
        return this.estadoCivil;
    }
    
    setEstadoCivil(estadoCivil: string){
        this.estadoCivil = estadoCivil;
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
    
    getPessoa(): Pessoa {
        return this.pessoa;
    }
    
    setPessoa(pessoa: Pessoa) {
        this.pessoa = pessoa;
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
    
    getFoto():any{
        return this.foto;
    }
    
    setFoto(foto:any){
        this.foto = foto;
    }
    
    getFotoBase64():string{
        return this.fotoBase64;
    }
    
    setFotoBase64(f:string){
        this.fotoBase64 = f;
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
    
    getPis() {
        return this.pis;
    }
    
    setPis(pis: string) {
        this.pis = pis;
    }
    
    getDataAdmissao() {
        return this.dataAdmissao;
    }
    
    setDataAdmissao(dataAdmissao: Date) {
        this.dataAdmissao = dataAdmissao;
    }
       
}