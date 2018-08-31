import { CustomDate} from './../generics/utils/custom-date.util';

export class ResultadoExameImport {
    private arquivo: any;
    private arquivoBase64: string;
    private inicio: Date;
    private fim: Date;
    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private fimCustomDate: CustomDate = new CustomDate(this.fim);
    
    getArquivo() {
        return this.arquivo;
    }

    setArquivo(arquivo: any) {
        this.arquivo = arquivo;
    }

    getArquivoBase64() {
        return this.arquivoBase64;
    }

    setArquivoBase64(arquivoBase64: string) {
        this.arquivoBase64 = arquivoBase64;
    }

    getInicio() {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio: Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomDate(){
        return this.inicioCustomDate;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }
    
    getFim() {
        this.fim = this.fimCustomDate.getApiDate();
        return this.fim;
    }
    
    setFim(fim: Date) {
        this.fimCustomDate.setApiDate(fim);
        this.fim = fim;
    }
    
    getFimCustomDate(){
        return this.fimCustomDate;
    }
    
    setFimCustomDate(fimCustomDate: CustomDate){
        this.fimCustomDate = fimCustomDate;
    }
    
}
