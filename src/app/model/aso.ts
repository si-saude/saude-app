import { Empregado } from './empregado';
import { Atendimento } from './atendimento';
import { AsoAlteracao } from './aso-alteracao';
import { Usuario } from './usuario';

export class Aso {
    private id: number;
    private empregado: Empregado;
    private atendimento: Atendimento;
    private data: Date;
    private validade: Date;
    private status: string;
    private asoAlteracoes: Array<AsoAlteracao>;
    private conforme: boolean;
    private naoConformidades: string;
    private usuario: Usuario;
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
    
    getAsoAlteracoes( ) {
        return this.asoAlteracoes;
    }
    
    setAsoAlteracoes( asoAlteracoes: Array<AsoAlteracao> ) {
        this.asoAlteracoes = asoAlteracoes;
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

}