import { EmpregadoConvocacao } from './empregado-convocacao';
import { ItemResultadoExame } from './item-resultado-exame';
import { Exame } from './exame';
import { CustomDate} from './../generics/utils/custom-date.util';

export class ResultadoExame {
    private id: number;
    private empregadoConvocacao: EmpregadoConvocacao;
    private exame: Exame;
    private itemResultadoExames: Array<ItemResultadoExame>;
    private data: Date;
    private dataRecebimento: Date;
    private conforme: boolean;
    private particular: boolean;
    private tipo: string = "";
    private acao: string = "";
    private local: string;
    private version: number;

    private dataCustomDate: CustomDate = new CustomDate(this.data);
    private dataRecebimentoCustomDate: CustomDate = new CustomDate(this.dataRecebimento);

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
    
    getParticular() {
        return this.particular;
    }

    setParticular(particular: boolean) {
        this.particular = particular;
    }
    
    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }
    
    getDataCustomDate(){
        return this.dataCustomDate;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
    
    getDataRecebimento() {
        this.dataRecebimento = this.dataRecebimentoCustomDate.getApiDate();
        return this.dataRecebimento;
    }
    
    setDataRecebimento(dataRecebimento: Date) {
        this.dataRecebimentoCustomDate.setApiDate(dataRecebimento);
        this.dataRecebimento = dataRecebimento;
    }
    
    getDataRecebimentoCustomDate(){
        return this.dataRecebimentoCustomDate;
    }
    
    setDataRecebimentoCustomDate(dataRecebimentoCustomDate: CustomDate){
        this.dataRecebimentoCustomDate = dataRecebimentoCustomDate;
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