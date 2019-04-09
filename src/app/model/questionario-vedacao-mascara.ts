import { CustomDate } from './../generics/utils/custom-date.util';

export class QuestionarioVedacaoMascara {
    private id: number;
    private data: Date;
    private fumacaIrritante: boolean;
    private sacarina: boolean;
    private acetatoIsoamil: boolean;
    private benzoatoDetonium: boolean;
    private tipoRespirador: string;
    private tamanhoRespirador: string;
    private modelo: string;
    private numeroCertificadoAprovacao: string;
    private filtroUtilizado: string;
    private barba: boolean;
    private bigode: boolean;
    private costeleta: boolean;
    private nAPelosFace: boolean;
    private oculos: boolean;
    private lenteContato: boolean;
    private nACorrecaoVisao: boolean;
    private satisfatoria: boolean;
    private deficiente: boolean;
    private nATesteQualitativo: boolean;

    private satisfatoriaTestePressao : boolean;    
    private deficienteTestePressao: boolean;    
    private nATestePressao: boolean;    
    private resultadoTesteVedacao: boolean;

    private comentario: string;
    private exposicaoAerodispersoide: string;
    private horaUsada: string;
    private diaUsado: string;

    private esforcoFisicoUtilizandoMascara: boolean;

    private version: number;

    private dataCustomDate: CustomDate = new CustomDate(this.data);

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
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
        return this.data;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
    
    public getBumacaIrritante() {
        return this.fumacaIrritante;
    }

    public setFumacaIrritante(fumacaIrritante: boolean) {
        this.fumacaIrritante = fumacaIrritante;
    }
    
    public getSacarina() {
        return this.sacarina;
    }

    public setSacarina(sacarina: boolean) {
        this.sacarina = sacarina;
    }
    
    public getAcetatoIsoamil() {
        return this.acetatoIsoamil;
    }

    public setAcetatoIsoamil(acetatoIsoamil: boolean) {
        this.acetatoIsoamil = acetatoIsoamil;
    }
    
    public getBenzoatoDetonium() {
        return this.benzoatoDetonium;
    }

    public setBenzoatoDetonium(benzoatoDetonium: boolean) {
        this.benzoatoDetonium = benzoatoDetonium;
    }

    public setTipoRespirador(tipoRespirador: string) {
        this.tipoRespirador = tipoRespirador;
    }

    public getTipoRespirador() {
        return this.tipoRespirador;
    }
    

    public setTamanhoRespirador(tamanhoRespirador: string) {
        this.tamanhoRespirador = tamanhoRespirador;
    }

    public getTamanhoRespirador() {
        return this.tamanhoRespirador;
    }
    
    public getVersion() {
        return this.version;
    }

    public setVersion(version: number) {
        this.version = version;
    }    
        

    public getModelo() {
        return this.modelo;
    }
    
    public setModelo(modelo: string) {
        this.modelo = modelo;
    }
    
    
    public getNumeroCertificadoAprovacao() {
        return this.numeroCertificadoAprovacao;
    }
    
    public setNumeroCertificadoAprovacao(numeroCertificadoAprovacao: string) {
        this.numeroCertificadoAprovacao = numeroCertificadoAprovacao;
    }
    
    
    public getFiltroUtilizado() {
        return this.filtroUtilizado;
    }
    
    public setFiltroUtilizado(filtroUtilizado: string) {
        this.filtroUtilizado = filtroUtilizado;
    }
   

    public getBarba() {
        return this.barba;
    }

    public setBarba(barba: boolean) {
        this.barba = barba;
    }
    
    public getBigode() {
        return this.bigode;
    }

    public setBigode(bigode: boolean) {
        this.bigode = bigode;
    }
    
    public getCosteleta() {
        return this.costeleta;
    }

    public setCosteleta(costeleta: boolean) {
        this.costeleta = costeleta;
    }
    
    public getnAPelosFace() {
        return this.nAPelosFace;
    }

    public setnAPelosFace(nAPelosFace: boolean) {
        this.nAPelosFace = nAPelosFace;
    }
    
    public getOculos() {
        return this.oculos;
    }

    public setOculos(oculos: boolean) {
        this.oculos = oculos;
    }
    
    public getLenteContato() {
        return this.lenteContato;
    }

    public setLenteContato(lenteContato: boolean) {
        this.lenteContato = lenteContato;
    }
    
    public getnACorrecaoVisao() {
        return this.nACorrecaoVisao;
    }

    public setnACorrecaoVisao(nACorrecaoVisao: boolean) {
        this.nACorrecaoVisao = nACorrecaoVisao;
    }
    
    public getSatisfatoria() {
        return this.satisfatoria;
    }

    public setSatisfatoria(satisfatoria: boolean) {
        this.satisfatoria = satisfatoria;
    }
    
    public getDeficiente() {
        return this.deficiente;
    }

    public setDeficiente(deficiente: boolean) {
        this.deficiente = deficiente;
    }
    
    public getnATesteQualitativo() {
        return this.nATesteQualitativo;
    }

    public setnATesteQualitativo(nATesteQualitativo: boolean) {
        this.nATesteQualitativo = nATesteQualitativo;
    }
    
    public getSatisfatoriaTestePressao() {
        return this.satisfatoriaTestePressao;
    }

    public setSatisfatoriaTestePressao(satisfatoriaTestePressao: boolean) {
        this.satisfatoriaTestePressao = satisfatoriaTestePressao;
    }
    public getDeficienteTestePressao() {
        return this.deficienteTestePressao;
    }

    public setDeficienteTestePressao(deficienteTestePressao: boolean) {
        this.deficienteTestePressao = deficienteTestePressao;
    }
    public getnATestePressao() {
        return this.nATestePressao;
    }

    public setnATestePressao(nATestePressao: boolean) {
        this.nATestePressao = nATestePressao;
    }
    public getResultadoTesteVedacao() {
        return this.resultadoTesteVedacao;
    }

    public setResultadoTesteVedacao(resultadoTesteVedacao: boolean) {
        this.resultadoTesteVedacao = resultadoTesteVedacao;
    }
    public getEsforcoFisicoUtilizandoMascara() {
        return this.esforcoFisicoUtilizandoMascara;
    }

    public setEsforcoFisicoUtilizandoMascara(esforcoFisicoUtilizandoMascara: boolean) {
        this.esforcoFisicoUtilizandoMascara = esforcoFisicoUtilizandoMascara;
    }
    
    public getComentario() {
        return this.comentario;
    }
    
    public setComentario(comentario: string) {
        this.comentario = comentario;
    }
    
    public getExposicaoAerodispersoide() {
        return this.exposicaoAerodispersoide;
    }
    
    public setExposicaoAerodispersoide(exposicaoAerodispersoide: string) {
        this.exposicaoAerodispersoide = exposicaoAerodispersoide;
    }
    
    public getHoraUsada() {
        return this.horaUsada;
    }
    
    public setHoraUsada(horaUsada: string) {
        this.horaUsada = horaUsada;
    }
    
    public getDiaUsado() {
        return this.diaUsado;
    }
    
    public setDiaUsado(diaUsado: string) {
        this.diaUsado = diaUsado;
    }    
}