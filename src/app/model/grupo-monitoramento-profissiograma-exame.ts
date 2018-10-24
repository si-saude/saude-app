import { GrupoMonitoramentoProfissiograma } from './grupo-monitoramento-profissiograma';
import { Exame } from './exame';
import { Criterio } from './criterio';

export class GrupoMonitoramentoProfissiogramaExame {
    private id: number = 0;
    private exame:Exame;
    private grupoMonitoramentoProfissiograma:GrupoMonitoramentoProfissiograma;
    private criterios: Array<Criterio>;
    private opcional: boolean;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getExame(){
        return this.exame;
    }
    
    setExame(exame){
        this.exame = exame;
    }
    
    getGrupoMonitoramentoProfissiograma(){
        return this.grupoMonitoramentoProfissiograma;
    }
    
    setGrupoMonitoramentoProfissiograma(g){
        this.grupoMonitoramentoProfissiograma = g;
    }
    
    getCriterios(){
        return this.criterios;
    }
    
    setCriterios(criterios){
        this.criterios =criterios; 
    }
    
    getOpcional(){
        return this.opcional;
    }
    
    setOpcional(o){
        this.opcional = o;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}