import { GrupoMonitoramentoProfissiograma } from './grupo-monitoramento-profissiograma';

export class Profissiograma {

    private id: number = 0;
    private nome: string;
    private concluido: boolean;
    private grupoMonitoramentoProfissiogramas: Array<GrupoMonitoramentoProfissiograma>;
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
    
    getGrupoMonitoramentoProfissiogramas() {
        return this.grupoMonitoramentoProfissiogramas;
    }
    
    setGrupoMonitoramentoProfissiogramas(g: Array<GrupoMonitoramentoProfissiograma>) {
        this.grupoMonitoramentoProfissiogramas = g;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}

