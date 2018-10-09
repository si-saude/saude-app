import { GrupoMonitoramento } from './grupo-monitoramento';

export class Avaliacao {
    private id: number;
    private nome: string;
    private grupoMonitoramento: GrupoMonitoramento;
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
    
    getGrupoMonitoramento(){
        return this.grupoMonitoramento;
    }
    
    setGrupoMonitoramento(grupoMonitoramento: GrupoMonitoramento){
        this.grupoMonitoramento = grupoMonitoramento;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}