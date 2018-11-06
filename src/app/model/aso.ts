import { Empregado } from './empregado';
import { Atendimento } from './atendimento';
import { AsoAlteracao } from './aso-alteracao';
import { Usuario } from './usuario';
import { Aptidao } from './aptidao';
import { AsoAvaliacao } from './aso-avaliacao';
import { Exame } from './exame';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Aso {
    private id: number;
    private empregado: Empregado;
    private atendimento: Atendimento;
    private data: Date;
    private validade: Date;
    private status: string;
    private asoAvaliacoes: Array<AsoAvaliacao>;
    private asoAlteracoes: Array<AsoAlteracao>;
    private conforme: boolean;
    private naoConformidades: string;
    private usuario: Usuario;
    private aptidoes: Array<Aptidao>;
    private ausenciaExames: boolean;
    private impressoSd2000: boolean;
    private pendente: boolean;
    private convocado: boolean;
    private dataRestricao: Date;
    private dataRestricaoCustomDate: CustomDate = new CustomDate(this.dataRestricao);
    private examesConvocacao: Array<Exame>;

    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getValidade() {
        return this.validade;
    }

    setValidade(validade: Date) {
        this.validade = validade;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento: Atendimento) {
        this.atendimento = atendimento;
    }

    getData() {
        return this.data;
    }

    setData(data: Date) {
        this.data = data;
    }
    
    getStatus() {
        return this.status;
    }
    
    setStatus( status: string ) {
        this.status = status;
    }

    getAptidoes( ) {
        return this.aptidoes;
    }
    
    setAptidoes( aptidoes: Array<Aptidao> ) {
        this.aptidoes = aptidoes;
    }
    
    
    getAsoAlteracoes( ) {
        return this.asoAlteracoes;
    }
    
    setAsoAlteracoes( asoAlteracoes: Array<AsoAlteracao> ) {
        this.asoAlteracoes = asoAlteracoes;
    }
    
    getAsoAvaliacoes( ) {
        return this.asoAvaliacoes;
    }
    
    setAsoAvaliacoes( asoAvaliacoes: Array<AsoAvaliacao> ) {
        this.asoAvaliacoes = asoAvaliacoes;
    }
    
    getConforme() {
        return this.conforme;
    }
    
    setConforme( conforme: boolean ) {
        this.conforme = conforme;
    }
    
    getNaoConformidades() {
        return this.naoConformidades;
    }
    
    setNaoConformidades( naoConformidades: string ) {
        this.naoConformidades = naoConformidades;
    }
    
    getUsuario() {
        return this.usuario;
    }
    
    setUsuario( usuario: Usuario ) {
        this.usuario = usuario;
    }
    getExamesConvocacao() {
        return this.examesConvocacao;
    }

    setExamesConvocacao(examesConvocacao) {
        this.examesConvocacao = examesConvocacao;
    }

    getAusenciaExames() {
        return this.ausenciaExames;
    }

    setAusenciaExames(ausenciaExames) {
        this.ausenciaExames = ausenciaExames;
    }
 
    getImpressoSd2000() {
        return this.impressoSd2000;
    }

    setImpressoSd2000(impressoSd2000) {
        this.impressoSd2000 = impressoSd2000;
    }
    
    getPendente() {
        return this.pendente;
    }

    setPendente(pendente) {
        this.pendente = pendente;
    }
    getDataRestricao() {
        this.dataRestricao = this.dataRestricaoCustomDate.getApiDate();
        return this.dataRestricao;
    }

    setDataRestricao(dataRestricao: Date) {
        this.dataRestricaoCustomDate.setApiDate(dataRestricao);
        this.dataRestricao = dataRestricao;
    }
    
    getDataRestricaoCustomDate(){
        return this.dataRestricaoCustomDate;
    }
    
    setDataRestricaoCustomDate(dataRestricaoCustomDate: CustomDate){
        this.dataRestricaoCustomDate = dataRestricaoCustomDate;
    }
    
    getConvocado() {
        return this.convocado;
    }

    setConvocado(convocado: boolean) {
        this.convocado = convocado;
    }
}