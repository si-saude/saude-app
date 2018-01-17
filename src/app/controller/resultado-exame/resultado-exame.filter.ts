import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { DateFilter } from './../../generics/date.filter';
import { ExameFilter } from './../exame/exame.filter';

export class ResultadoExameFilter extends GenericFilter {
    private exame: ExameFilter;
    private data: DateFilter;
    private dataRecebimento: DateFilter;
    private tipo: string;
    private acao: string;
    private local: string;
    private conforme: BooleanFilter;
    
    getExame() {
        return this.exame;
    }
    setExame(exame:ExameFilter) {
        this.exame = exame;
    }
    getData() {
        return this.data;
    }
    setData(data: DateFilter) {
        this.data = data;
    }
    getDataRecebimento() {
        return this.dataRecebimento;
    }
    setDataRecebimento(dataRecebimento: DateFilter) {
        this.dataRecebimento = dataRecebimento;
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
    getConforme() {
        return this.conforme;
    }
    setConforme(conforme: BooleanFilter) {
        this.conforme = conforme;
    }

}