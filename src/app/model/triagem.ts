import { IndicadorSast } from './indicador-sast';
import { Atendimento } from './atendimento';
import { Diagnostico } from './diagnostico';
import { Intervencao } from './intervencao';
import { Equipe } from './equipe';
import { RiscoEmpregado } from './risco-empregado';
import { Acao } from './acao';

export class Triagem {
    private id: number;
    private indicadorSast: IndicadorSast;
    private atendimento: Atendimento;
    private indice: number = -1;
    private riscoEmpregado: RiscoEmpregado;
    private diagnostico: Diagnostico;
    private intervencao: Intervencao;
    private equipeAbordagem: Equipe;
    private prazo: string = "";
    private justificativa: string;
    private acoes: Array<Acao>;
    private ignorarAcoes: boolean;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getIndicadorSast() {
        return this.indicadorSast;
    }

    setIndicadorSast(indicadorSast: IndicadorSast) {
        this.indicadorSast = indicadorSast;
    }
    
    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento: Atendimento) {
        this.atendimento = atendimento;
    }

    getIndice() {
        return this.indice;
    }

    setIndice(indice: number) {
        this.indice = indice;
    }
    
    getRiscoEmpregado() {
        return this.riscoEmpregado;
    }
    
    setRiscoEmpregado(riscoEmpregado: RiscoEmpregado) {
        this.riscoEmpregado = riscoEmpregado;
    }
    
    getDiagnostico(){
        return this.diagnostico;
    }
    
    setDiagnostico(d:Diagnostico){
        this.diagnostico = d;
    }
    
    getIntervencao(){
        return this.intervencao;
    }
    
    setIntervencao(i:Intervencao){
        this.intervencao = i;
    }
    
    getEquipeAbordagem(){
        return this.equipeAbordagem;
    }
    
    setEquipeAbordagem(e:Equipe){
        this.equipeAbordagem = e;
    }
    
    getPrazo(){
        return this.prazo;
    }
    
    setPrazo(prazo:string){
        this.prazo = prazo;
    }
    
    getJustificativa(){
        return this.justificativa;
    }
    
    setJustificativa(justificativa:string){
        this.justificativa = justificativa;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    getAcoes() {
        return this.acoes;
    }

    setAcoes(acoes: Array<Acao>) {
        this.acoes = acoes;
    }
    
    getIgnorarAcoes() {
        return this.ignorarAcoes;
    }
    
    setIgnorarAcoes(ignorarAcoes: boolean) {
        this.ignorarAcoes = ignorarAcoes;
    }
    
}