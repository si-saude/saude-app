import { GrupoMonitoramento } from './grupo-monitoramento';
import { Empregado } from './empregado';

export class HistoricoGrupoMonitoramento {
    private id: number;
    private dataRemocao: Date;
    private grupoMonitoramento: GrupoMonitoramento;
    private empregado: Empregado;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getDataRemocao() {
        return this.dataRemocao;
    }

    setDataRemocao(dataRemocao: Date) {
        this.dataRemocao = dataRemocao;
    }

    getGrupoMonitoramento() {
        return this.grupoMonitoramento;
    }

    setGrupoMonitoramento(grupoMonitoramento: GrupoMonitoramento) {
        this.grupoMonitoramento = grupoMonitoramento;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

}