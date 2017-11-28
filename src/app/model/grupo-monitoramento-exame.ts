import { Exame } from './exame';
import { Periodicidade } from './periodicidade';
import { GrupoMonitoramento } from './grupo-monitoramento';
import { Criterio } from './criterio';

export class GrupoMonitoramentoExame {
    private id: number;
    private exame: Exame;
    private periodicidade: Periodicidade;
    private grupoMonitoramento: GrupoMonitoramento;
    private criterios: Array<Criterio>;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getExame() {
        return this.exame;
    }
    
    setExame(exame: Exame) {
        this.exame = exame;
    }
    
    getPeriodicidade() {
        return this.periodicidade;
    }
    
    setPeriodicidade(periodicidade: Periodicidade) {
        this.periodicidade = periodicidade;
    }
    
    getGrupoMonitoramento() {
        return this.grupoMonitoramento;
    }
    
    setGrupoMonitoramento(grupoMonitoramento: GrupoMonitoramento) {
        this.grupoMonitoramento = grupoMonitoramento;
    }
    
    getCriterios() {
        return this.criterios;
    }
    
    setCriterios(criterios: Array<Criterio>) {
        this.criterios = criterios;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }

}
