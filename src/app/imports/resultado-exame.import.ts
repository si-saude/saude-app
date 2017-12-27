export class ResultadoExameImport {
    private arquivo: any;
    private arquivoBase64: string;
    private inicio: Date;
    private fim: Date;
    
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
        return this.inicio;
    }

    setInicio(inicio: Date) {
        this.inicio = inicio;
    }

    getFim() {
        return this.fim;
    }

    setFim(fim: Date) {
        this.fim = fim;
    }
    
}
