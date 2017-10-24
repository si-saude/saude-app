import { GrupoMonitoramento } from './grupo-monitoramento';

export class Profissiograma {

    private id: number;
    private nome: string;
    private grupoMonitoramentos: Array<GrupoMonitoramento>;
    private version: number;
    
    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getNome() {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getGrupoMonitoramentos() {
        return this.grupoMonitoramentos;
    }
    
    setGrupoMonitoramentos(grupoMonitoramentos: Array<GrupoMonitoramento>) {
        this.grupoMonitoramentos = grupoMonitoramentos;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}

