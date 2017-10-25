import { TipoGrupoMonitoramento } from './tipo-grupo-monitoramento';
import { GrupoMonitoramentoExame } from './grupo-monitoramento-exame';
import { Profissiograma } from './profissiograma';
import { Empregado } from './empregado';

export class GrupoMonitoramento {
    
    private id: number;
    private nome: string;
    private tipoGrupoMonitoramento: TipoGrupoMonitoramento;
    private grupoMonitoramentoExames: Array<GrupoMonitoramentoExame>;
    private profissiogramas: Array<Profissiograma>;
    private empregados: Array<Empregado>;
    private recorrente: boolean;
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
    
    getTipoGrupoMonitoramento() {
        return this.tipoGrupoMonitoramento;
    }
    
    setTipoGrupoMonitoramento(tipoGrupoMonitoramento: TipoGrupoMonitoramento) {
        this.tipoGrupoMonitoramento = tipoGrupoMonitoramento;
    }
    
    getGrupoMonitoramentoExames() {
        return this.grupoMonitoramentoExames;
    }
    
    setGrupoMonitoramentoExames(grupoMonitoramentoExames: Array<GrupoMonitoramentoExame>) {
        this.grupoMonitoramentoExames = grupoMonitoramentoExames;
    }
    
    getProfissiogramas() {
        return this.profissiogramas;
    }
    
    setProfissiogramas(profissiogramas: Array<Profissiograma>) {
        this.profissiogramas = profissiogramas;
    }
    
    getEmpregado() {
        return this.empregados;
    }
    
    setEmpregados(empregados: Array<Empregado>) {
        this.empregados = empregados;
    }
    
    getRecorrente() {
        return this.recorrente;
    }
    
    setRecorrente(recorrente: boolean) {
        this.recorrente = recorrente;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
}