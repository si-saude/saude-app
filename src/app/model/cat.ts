import { Gerencia } from './gerencia';
import { Empregado } from './empregado';
import { Fornecedor } from './fornecedor';
import { Diagnostico } from './diagnostico';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Cat {
    private id: number;
    private numero: string;
    private gerencia: Gerencia;
    private rta: string;
    private instalacao: string;
    private contratado: boolean;
    private empregado: Empregado;
    private nome: string;
    private sexo: string;
    private cpf: string;
    private cargo: string;
    private empresa: Fornecedor;
    private regime: string;
    private afastamento: boolean;
    private partesCorpo: string;
    private numeroSisin: string;
    private classificacaoSisin: number;
    private gravidade: string;
    private registroSd2000: boolean;
    private catSd2000: boolean;
    private tipoAcidente: string;
    private tipoCat: string;
    private diagnostico: Diagnostico;
    private comunicavelSus: boolean;
    private ferimentoGraveConformeAnp: boolean;
    private codigoCartaSindicato: string;
    private remuneracao: number;
    private version: number;
    private dataNascimento: Date;
    private dataComunicacaoSindicato: Date;
    private dataAvaliacaoMedica: Date;
    private dataEmissaoCat: Date;
    private diaHoraAcidente: Date;

    private dataNascimentoCustomDate: CustomDate = new CustomDate(this.dataNascimento);
    private diaHoraAcidenteCustomDate: CustomDate = new CustomDate(this.diaHoraAcidente);
    private dataEmissaoCatCustomDate: CustomDate = new CustomDate(this.dataEmissaoCat);
    private dataAvaliacaoMedicaCustomDate: CustomDate = new CustomDate(this.dataAvaliacaoMedica);
    private dataComunicacaoSindicatoCustomDate: CustomDate = new CustomDate(this.dataComunicacaoSindicato);

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getNumero() {
        return this.numero;
    }

    public setNumero(numero) {
        this.numero = numero;
    }
    
    public getGerencia() {
        return this.gerencia;
    }

    public setGerencia(gerencia) {
        this.gerencia = gerencia;
    }

    public getRta() {
        return this.rta;
    }

    public setRta(rta) {
        this.rta = rta;
    }

    public getInstalacao() {
        return this.instalacao;
    }

    public setInstalacao(instalacao) {
        this.instalacao = instalacao;
    }

    public getContratado() {
        return this.contratado;
    }

    public setContratado(contratado) {
        this.contratado = contratado;
    }

    public getEmpregado() {
        return this.empregado;
    }

    public setEmpregado(empregado) {
        this.empregado = empregado;
    }

    public getNome() {
        return this.nome;
    }

    public setNome(nome) {
        this.nome = nome;
    }
    
    getDataNascimento() {
        this.dataNascimento = this.dataNascimentoCustomDate.getApiDate();
        return this.dataNascimento;
    }
    
    setDataNascimento(dataNascimento: Date) {
        this.dataNascimentoCustomDate.setApiDate(dataNascimento);
        this.dataNascimento = dataNascimento;
    }
    
    getDataNascimentoCustomDate(){
        return this.dataNascimentoCustomDate;
    }
    
    setDataNascimentoCustomDate(dataNascimentoCustomDate: CustomDate){
        this.dataNascimentoCustomDate = dataNascimentoCustomDate;
    }
    
    getDiaHoraAcidente() {
        this.diaHoraAcidente = this.diaHoraAcidenteCustomDate.getApiDate();
        return this.diaHoraAcidente;
    }
    
    setDiaHoraAcidente(diaHoraAcidente: Date) {
        this.diaHoraAcidenteCustomDate.setApiDate(diaHoraAcidente);
        this.diaHoraAcidente = diaHoraAcidente;
    }
    
    getDiaHoraAcidenteCustomDate(){
        return this.diaHoraAcidenteCustomDate;
    }
    
    setDiaHoraAcidenteCustomDate(diaHoraAcidenteCustomDate: CustomDate){
        this.diaHoraAcidenteCustomDate = diaHoraAcidenteCustomDate;
    }
    
    getDataEmissaoCat() {
        this.dataEmissaoCat = this.dataEmissaoCatCustomDate.getApiDate();
        return this.dataEmissaoCat;
    }
    
    setDataEmissaoCat(dataEmissaoCat: Date) {
        this.dataEmissaoCatCustomDate.setApiDate(dataEmissaoCat);
        this.dataEmissaoCat = dataEmissaoCat;
    }
    
    getDataEmissaoCatCustomDate(){
        return this.dataEmissaoCatCustomDate;
    }
    
    setDataEmissaoCatCustomDate(dataEmissaoCatCustomDate: CustomDate){
        this.dataEmissaoCatCustomDate = dataEmissaoCatCustomDate;
    }
    
    getDataAvaliacaoMedica() {
        this.dataAvaliacaoMedica = this.dataAvaliacaoMedicaCustomDate.getApiDate();
        return this.dataAvaliacaoMedica;
    }
    
    setDataAvaliacaoMedica(dataAvaliacaoMedica: Date) {
        this.dataAvaliacaoMedicaCustomDate.setApiDate(dataAvaliacaoMedica);
        this.dataAvaliacaoMedica = dataAvaliacaoMedica;
    }
    
    getDataAvaliacaoMedicaCustomDate(){
        return this.dataAvaliacaoMedicaCustomDate;
    }
    
    setDataAvaliacaoMedicaCustomDate(dataAvaliacaoMedicaCustomDate: CustomDate){
        this.dataAvaliacaoMedicaCustomDate = dataAvaliacaoMedicaCustomDate;
    }
    
    getDataComunicacaoSindicato() {
        this.dataComunicacaoSindicato = this.dataComunicacaoSindicatoCustomDate.getApiDate();
        return this.dataComunicacaoSindicato;
    }
    
    setDataComunicacaoSindicato(dataComunicacaoSindicato: Date) {
        this.dataComunicacaoSindicatoCustomDate.setApiDate(dataComunicacaoSindicato);
        this.dataComunicacaoSindicato = dataComunicacaoSindicato;
    }
    
    getDataComunicacaoSindicatoCustomDate(){
        return this.dataComunicacaoSindicatoCustomDate;
    }
    
    setDataComunicacaoSindicatoCustomDate(dataComunicacaoSindicatoCustomDate: CustomDate){
        this.dataComunicacaoSindicatoCustomDate = dataComunicacaoSindicatoCustomDate;
    }
    
    public getSexo() {
        return this.sexo;
    }

    public setSexo(sexo) {
        this.sexo = sexo;
    }

    public getCpf() {
        return this.cpf;
    }

    public setCpf(cpf) {
        this.cpf = cpf;
    }

    public getCargo() {
        return this.cargo;
    }

    public setCargo(cargo) {
        this.cargo = cargo;
    }

    public getEmpresa() {
        return this.empresa;
    }

    public setEmpresa(empresa) {
        this.empresa = empresa;
    }

    public getRegime() {
        return this.regime;
    }

    public setRegime(regime) {
        this.regime = regime;
    }

    public getAfastamento() {
        return this.afastamento;
    }

    public setAfastamento(afastamento) {
        this.afastamento = afastamento;
    }

    public getNumeroSisin() {
        return this.numeroSisin;
    }

    public setNumeroSisin(numeroSisin) {
        this.numeroSisin = numeroSisin;
    }

    public getClassificacaoSisin() {
        return this.classificacaoSisin;
    }

    public setClassificacaoSisin(classificacaoSisin) {
        this.classificacaoSisin = classificacaoSisin;
    }

    public getGravidade() {
        return this.gravidade;
    }

    public setGravidade(gravidade) {
        this.gravidade = gravidade;
    }

    public getRegistroSd2000() {
        return this.registroSd2000;
    }

    public setRegistroSd2000(registroSd2000) {
        this.registroSd2000 = registroSd2000;
    }

    public getCatSd2000() {
        return this.catSd2000;
    }

    public setCatSd2000(catSd2000) {
        this.catSd2000 = catSd2000;
    }

    public getTipoAcidente() {
        return this.tipoAcidente;
    }

    public setTipoAcidente(tipoAcidente) {
        this.tipoAcidente = tipoAcidente;
    }

    public getDiagnostico() {
        return this.diagnostico;
    }

    public setDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }

    public isComunicavelSus() {
        return this.comunicavelSus;
    }

    public setComunicavelSus(comunicavelSus) {
        this.comunicavelSus = comunicavelSus;
    }

    public getFerimentoGraveConformeAnp() {
        return this.ferimentoGraveConformeAnp;
    }

    public setFerimentoGraveConformeAnp(ferimentoGraveConformeAnp) {
        this.ferimentoGraveConformeAnp = ferimentoGraveConformeAnp;
    }

    public getCodigoCartaSindicato() {
        return this.codigoCartaSindicato;
    }

    public setCodigoCartaSindicato(codigoCartaSindicato) {
        this.codigoCartaSindicato = codigoCartaSindicato;
    }

    public getRemuneracao() {
        return this.remuneracao;
    }

    public setRemuneracao(remuneracao) {
        this.remuneracao = remuneracao;
    }
    
    public getPartesCorpo() {
        return this.partesCorpo;
    }

    public setPartesCorpo(partesCorpo) {
        this.partesCorpo = partesCorpo;
    }

    public getTipoCat() {
        return this.tipoCat;
    }

    public setTipoCat(tipoCat) {
        this.tipoCat = tipoCat;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
}
