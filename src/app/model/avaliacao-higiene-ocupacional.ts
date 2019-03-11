import { Localizacao } from './localizacao';
import { Profissional } from './profissional';
import { Empregado } from './empregado'
import { CustomDate } from './../generics/utils/custom-date.util';
import { Gerencia } from './gerencia'
import { Funcao } from './funcao'
import { Ghe } from './ghe'

export class AvaliacaoHigieneOcupacional {
    private id: number;
    private inicio: Date;
    private fim: Date;
    private profissional: Profissional; 
    private empregado: Empregado;
    private gerencia: Gerencia;
    private funcao: Funcao;
    private ghe: Ghe;
    private aprho: string;
    private brigada: boolean;
    private espacoConfinado: boolean;
    private opEcolEcomp: boolean;
    private fiscalSopSg: boolean;
    private outros: boolean;
    private usoVoluntario: boolean;
    private ensaioVedacaoRealizado: boolean;
    private ensaioVedacao: string;
    private naoBarbeado: boolean;
    private naoUtilizaMascara: boolean;
    private testeSensibilidadeInsatisfatorio: boolean;
    private concordaDescricaoAprhoGhe: boolean;
    private hOconcordaDescricaoAprhoGhe: boolean;
    private naoConcordaAgentesRiscos: boolean;
    private naoConcordaAtividades: boolean;
    private naoConcordaFrequenciaExposicaoRiscos: boolean;
    private naoConcordaCategoriaRiscos: boolean;
    private motivoAnalisePreliminar: string;
    private observacaoGHE: string;
    private justificativaHO: string;
    private observacao: string;
    private version: number;

    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private fimCustomDate: CustomDate = new CustomDate(this.fim);

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }
    
    public getProfissional() {
        return this.profissional;
    }

    public setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomDate(){
        return this.inicio;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }
    
    getFim() {
        this.fim = this.fimCustomDate.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomDate.setApiDate(fim);
        this.fim = fim;
    }
    
    getFimCustomDate(){
        return this.fim;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
    }

    public getEmpregado() {
        return this.empregado;
    }

    public setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    public getBrigada() {
        return this.brigada;
    }

    public setBrigada(brigada: boolean) {
        this.brigada = brigada;
    }

    public getEspacoConfinado() {
        return this.espacoConfinado;
    }

    public setEspacoConfinado(espacoConfinado: boolean) {
        this.espacoConfinado = espacoConfinado;
    }

    public getUsoVoluntario() {
        return this.usoVoluntario;
    }

    public setUsoVoluntario(usoVoluntario: boolean) {
        this.usoVoluntario = usoVoluntario;
    }

    public getNaoBarbeado() {
        return this.naoBarbeado;
    }

    public setNaoBarbeado(naoBarbeado: boolean) {
        this.naoBarbeado = naoBarbeado;
    }

    public getNaoUtilizaMascara() {
        return this.naoUtilizaMascara;
    }

    public setNaoUtilizaMascara(naoUtilizaMascara: boolean) {
        this.naoUtilizaMascara = naoUtilizaMascara;
    }

    public getTesteSensibilidadeInsatisfatorio() {
        return this.testeSensibilidadeInsatisfatorio;
    }

    public setEnsaioVedacao(ensaioVedacao: string) {
        this.ensaioVedacao = ensaioVedacao;
    }

    public getEnsaioVedacao() {
        return this.ensaioVedacao;
    }
    
    public setTesteSensibilidadeInsatisfatorio(testeSensibilidadeInsatisfatorio: boolean) {
        this.testeSensibilidadeInsatisfatorio = testeSensibilidadeInsatisfatorio;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao: string) {
        this.observacao = observacao;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version: number) {
        this.version = version;
    }
    
    public getConcordaDescricaoAprhoGhe() {
        return this.concordaDescricaoAprhoGhe;
    }

    public setConcordaDescricaoAprhoGhe(concordaDescricaoAprhoGhe: boolean) {
        this.concordaDescricaoAprhoGhe = concordaDescricaoAprhoGhe;
    }
    
    public getNaoConcordaAgentesRiscos() {
        return this.naoConcordaAgentesRiscos;
    }

    public setNaoConcordaAgentesRiscos(naoConcordaAgentesRiscos: boolean) {
        this.naoConcordaAgentesRiscos = naoConcordaAgentesRiscos;
    }
    
    public getNaoConcordaAtividades() {
        return this.naoConcordaAtividades;
    }

    public setNaoConcordaAtividades(naoConcordaAtividades: boolean) {
        this.naoConcordaAtividades = naoConcordaAtividades;
    }
    
    public getNaoConcordaFrequenciaExposicaoRiscos() {
        return this.naoConcordaFrequenciaExposicaoRiscos;
    }

    public setNaoConcordaFrequenciaExposicaoRiscos(naoConcordaFrequenciaExposicaoRiscos: boolean) {
        this.naoConcordaFrequenciaExposicaoRiscos = naoConcordaFrequenciaExposicaoRiscos;
    }
    
    public getNaoConcordaCategoriaRiscos() {
        return this.naoConcordaCategoriaRiscos;
    }

    public setNaoConcordaCategoriaRiscos(naoConcordaCategoriaRiscos: boolean) {
        this.naoConcordaCategoriaRiscos = naoConcordaCategoriaRiscos;
    }
    
    public getMotivoAnalisePreliminar() {
        return this.motivoAnalisePreliminar;
    }

    public setMotivoAnalisePreliminar(motivoAnalisePreliminar: string) {
        this.motivoAnalisePreliminar = motivoAnalisePreliminar;
    }
    
    public getGerencia() {
        return this.gerencia;
    }

    public setGerencia(gerencia: Gerencia) {
        this.gerencia = gerencia;
    }
    
    public getFuncao() {
        return this.funcao;
    }

    public setFuncao(funcao: Funcao) {
        this.funcao = funcao;
    }    
    
    public getGhe() {
        return this.ghe;
    }

    public setGhe(ghe: Ghe) {
        this.ghe = ghe;
    }    
    
    public getAprho() {
        return this.aprho;
    }

    public setAprho(aprho: string) {
        this.aprho = aprho;
    }
    
    public getFiscalSopSg() {
        return this.fiscalSopSg;
    }

    public setFiscalSopSg(fiscalSopSg: boolean) {
        this.fiscalSopSg = fiscalSopSg;
    }
    
    public setOpEcolEcomp(opEcolEcomp: boolean) {
        this.opEcolEcomp = opEcolEcomp;
    }
    
    public getOpEcolEcomp() {
        return this.opEcolEcomp;
    }

    public getOutros() {
        return this.outros;
    }
    
    public setOutros(outros: boolean) {
        this.outros = outros;
    }
    
    public getEnsaioVedacaoRealizado() {
        return this.ensaioVedacaoRealizado;
    }
    
    public setEnsaioVedacaoRealizado(ensaioVedacaoRealizado: boolean) {
        this.ensaioVedacaoRealizado = ensaioVedacaoRealizado;
    }
    
    public getObservacaoGHE() {
        return this.observacaoGHE;
    }

    public setObservacaoGHE(observacaoGHE: string) {
        this.observacaoGHE = observacaoGHE;
    }   
    public getHOconcordaDescricaoAprhoGhe() {
        return this.hOconcordaDescricaoAprhoGhe;
    }

    public setHOconcordaDescricaoAprhoGhe(hOconcordaDescricaoAprhoGhe: boolean) {
        this.hOconcordaDescricaoAprhoGhe = hOconcordaDescricaoAprhoGhe;
    }
    public getJustificativaHO() {
        return this.justificativaHO;
    }

    public setJustificativaHO(justificativaHO: string) {
        this.justificativaHO = justificativaHO;
    }    
        
}