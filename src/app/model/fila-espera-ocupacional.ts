import { Servico } from './servico';
import { Localizacao } from './localizacao';
import { Empregado } from './empregado';
import { FichaColeta } from './ficha-coleta';
import { RiscoPotencial } from './risco-potencial';

export class FilaEsperaOcupacional {
    private id: number;
    private servico: Servico;
    private localizacao: Localizacao;
    private empregado: Empregado;
    private horarioCheckin: Date;
    private atualizacao: Date;
    private status: string;
    private tempoEspera: number;
    private fichaColeta: FichaColeta;
    private riscoPotencial: RiscoPotencial;
    private saida: Date;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getTempoEspera() {
        return this.tempoEspera;
    }

    setTempoEspera(tempoEspera: number) {
        this.tempoEspera = tempoEspera;
    }

    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getServico() {
        return this.servico;
    }

    setServico(servico: Servico) {
        this.servico = servico;
    }

    getLocalizacao() {
        return this.localizacao;
    }

    setLocalizacao(localizacao: Localizacao) {
        this.localizacao = localizacao;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getHorarioCheckin() {
        return this.horarioCheckin;
    }

    setHorarioCheckin(horarioCheckin: Date) {
        this.horarioCheckin = horarioCheckin;
    }

    getAtualizacao() {
        return this.atualizacao;
    }

    setAtualizacao(atualizacao: Date) {
        this.atualizacao = atualizacao;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getSaida() {
        return this.saida;
    }

    setSaida(saida: Date) {
        this.saida = saida;
    }
    
    getFichaColeta() {
        return this.fichaColeta;
    }
    
    setFichaColeta(fichaColeta: FichaColeta) {
        this.fichaColeta = fichaColeta;
    }
    
    getRiscoPotencial() {
        return this.riscoPotencial;
    }
    
    setRiscoPotencial(riscoPotencial: RiscoPotencial) {
        this.riscoPotencial = riscoPotencial;
    }
}
