import { GrupoMonitoramento } from './grupo-monitoramento';
import { Empregado } from './empregado';
import { CustomDate} from './../generics/utils/custom-date.util';

export class HistoricoGrupoMonitoramento {
    private id: number;
    private dataRemocao: Date;
    private grupoMonitoramento: GrupoMonitoramento;
    private empregado: Empregado;
    private version: number;

    private dataRemocaoCustomDate: CustomDate = new CustomDate(this.dataRemocao);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getDataRemocao() {
        this.dataRemocao = this.dataRemocaoCustomDate.getApiDate();
        return this.dataRemocao;
    }
    
    setDataRemocao(dataRemocao: Date) {
        this.dataRemocaoCustomDate.setApiDate(dataRemocao);
        this.dataRemocao = dataRemocao;
    }
    
    getDataRemocaoCustomDate(){
        return this.dataRemocaoCustomDate;
    }
    
    setDataRemocaoCustomDate(dataRemocaoCustomDate: CustomDate){
        this.dataRemocaoCustomDate = dataRemocaoCustomDate;
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