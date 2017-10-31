import { GrupoMonitoramento } from './grupo-monitoramento';

export class Profissiograma {

    private id: number;
    private nome: string;
    private concluido: boolean;
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
    
    getConcluido() {
        return this.concluido;
    }
    
    setConcluido(concluido: boolean) {
        this.concluido = concluido;
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

