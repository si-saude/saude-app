import { Profissiograma } from './profissiograma';
import { GrupoMonitoramento } from './grupo-monitoramento';
import { GrupoMonitoramentoProfissiogramaExame } from './grupo-monitoramento-profissiograma-exame';

export class GrupoMonitoramentoProfissiograma {
 
    private id: number = 0;
    private grupoMonitoramento:GrupoMonitoramento;
    private profissiograma:Profissiograma;
    private grupoMonitoramentoProfissiogramaExames:Array<GrupoMonitoramentoProfissiogramaExame>;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getGrupoMonitoramento(){
        return this.grupoMonitoramento;
    }
    
    setGrupoMonitoramento(g){
        this.grupoMonitoramento = g;
    }
    
    getProfissiograma(){
        return this.profissiograma;
    }
    
    setProfissiograma(p){
        this.profissiograma = p;
    }
    
    getGrupoMonitoramentoProfissiogramaExames(){
        return this.grupoMonitoramentoProfissiogramaExames;
    }
    
    setGrupoMonitoramentoProfissiogramaExames(g){
        this.grupoMonitoramentoProfissiogramaExames = g;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}