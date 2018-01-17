import { EmpregadoConvocacao } from './empregado-convocacao';
import { ItemResultadoExame } from './item-resultado-exame';
import { Exame } from './exame';

export class ResultadoExame {
    private id: number;
    private empregadoConvocacao: EmpregadoConvocacao;
    private exame: Exame;
    private itemResultadoExames: Array<ItemResultadoExame>;
    private data: Date;
    private dataRecebimento: Date;
    private conforme: boolean;
    private tipo: string = "";
    private acao: string = "";
    private local: string;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getEmpregadoConvocacao() {
        return this.empregadoConvocacao;
    }

    setEmpregadoConvocacao(empregadoConvocacao: EmpregadoConvocacao) {
        this.empregadoConvocacao = empregadoConvocacao;
    }

    getConforme() {
        return this.conforme;
    }

    setConforme(conforme: boolean) {
        this.conforme = conforme;
    }
    
    getData() {
        return this.data;
    }

    setData(data: Date) {
        this.data = data;
    }
    
    getDataRecebimento() {
        return this.dataRecebimento;
    }

    setDataRecebimento(dataRecebimento: Date) {
        this.dataRecebimento = dataRecebimento;
    }
    
    getExame() {
        return this.exame;
    }

    setExame(exame: Exame) {
        this.exame = exame;
    }

    getItemResultadoExames() {
        return this.itemResultadoExames;
    }

    setItemResultadoExames(itemResultadoExames: Array<ItemResultadoExame>) {
        this.itemResultadoExames = itemResultadoExames;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo: string) {
        this.tipo = tipo;
    }

    getAcao() {
        return this.acao;
    }

    setAcao(acao: string) {
        this.acao = acao;
    }

    getLocal() {
        return this.local;
    }

    setLocal(local: string) {
        this.local = local;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}