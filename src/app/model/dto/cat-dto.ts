export class CatDto {
    private orgao: string;
    private rta: string;
    private mes: string;
    private diaSemana: string;
    private instalacao: string;
    private proprioContratado: string;
    private empresa: string;
    private cnae: string;
    private grauRiscoEmpresa: number;
    private nomeAcidentado: string;
    private regimeTrabalho: string;
    private jornadaTrabalho: number;
    private acidenteComSemAfastamento: string;
    private parteCorpoAtingida: string;
    private horaAcidente: string;
    private municipioAcidente: string;
    private numeroSisin: string;
    private classificacaoSisin: number;
    private dataAcidente: string;
    private dataEmissaoCat: string;
    private diasAtraso: number;
    private prazo: string;
    private classificacaoGravidade: string;
    private dataAvaliacaoMedica: string;
    private registroSd2000: boolean;
    private catSd2000: boolean;
    private situacaoAvaliacaoMedica: string;
    private dataLiberacao: string;
    private pendenciaCorrecaoCat: boolean;
    private justificativaAtrasoEmissaoCat: string;
    private numeroCartaMultaEmpresa: string;
    private tipoAcidente: string;
    private tipoCat: string;
    private diagnosticoProvavel: string;
    private agenteCausador: string;
    private comunicavelSus: boolean;
    private ferimentoGraveConformeANP: boolean;
    private numeroCat: string;
    private localizacaoLesao: string;
    private naturezaLesao: string;
    private diasAfastamento: string;
    private intervaloAfastamento: string;
    private horasPerdidas: string;
    private salarioHora: number;
    private custoAcidente2: string;
    private codigoCartaSindicato: string;
    private classificacaoAnomalia: number;
    private dataComunicacaoSindicato: string;
    private diasAcidenteComunicacaoSindicato: string;
    private justificativaAtrasoEmissaoCarta: string;
    private dataNascimento: string;
    private idade: number;
    private sexo: string;
    private grauInstrucao: string;
    private estadoCivil: string;
    private remuneracao: number;
    private cargo: string;
    private ato1: string;
    private ato2: string;
    private ato3: string;
    private ato4: string;
    
    getOrgao() {
        return this.orgao;
    }
    setOrgao(orgao) {
        this.orgao = orgao;
    }
    getRta() {
        return this.rta;
    }
    setRta(rta) {
        this.rta = rta;
    }
    getMes() {
        return this.mes;
    }
    setMes(mes) {
        this.mes = mes;
    }
    getDiaSemana() {
        return this.diaSemana;
    }
    setDiaSemana(diaSemana) {
        this.diaSemana = diaSemana;
    }
    getInstalacao() {
        return this.instalacao;
    }
    setInstalacao(instalacao) {
        this.instalacao = instalacao;
    }
    getProprioContratado() {
        return this.proprioContratado;
    }
    setProprioContratado(proprioContratado) {
        this.proprioContratado = proprioContratado;
    }
    getEmpresa() {
        return this.empresa;
    }
    setEmpresa(empresa) {
        this.empresa = empresa;
    }
    getCnae() {
        return this.cnae;
    }
    setCnae(cnae) {
        this.cnae = cnae;
    }
    getGrauRiscoEmpresa() {
        return this.grauRiscoEmpresa;
    }
    setGrauRiscoEmpresa(grauRiscoEmpresa) {
        this.grauRiscoEmpresa = grauRiscoEmpresa;
    }
    getNomeAcidentado() {
        return this.nomeAcidentado;
    }
    setNomeAcidentado(nomeAcidentado) {
        this.nomeAcidentado = nomeAcidentado;
    }
    getRegimeTrabalho() {
        return this.regimeTrabalho;
    }
    setRegimeTrabalho(regimeTrabalho) {
        this.regimeTrabalho = regimeTrabalho;
    }
    getJornadaTrabalho() {
        return this.jornadaTrabalho;
    }
    setJornadaTrabalho(jornadaTrabalho) {
        this.jornadaTrabalho = jornadaTrabalho;
    }
    getAcidenteComSemAfastamento() {
        return this.acidenteComSemAfastamento;
    }
    setAcidenteComSemAfastamento(acidenteComSemAfastamento) {
        this.acidenteComSemAfastamento = acidenteComSemAfastamento;
    }
    getParteCorpoAtingida() {
        return this.parteCorpoAtingida;
    }
    setParteCorpoAtingida(parteCorpoAtingida) {
        this.parteCorpoAtingida = parteCorpoAtingida;
    }
    getHoraAcidente() {
        return this.horaAcidente;
    }
    setHoraAcidente(horaAcidente) {
        this.horaAcidente = horaAcidente;
    }
    getMunicipioAcidente() {
        return this.municipioAcidente;
    }
    setMunicipioAcidente(municipioAcidente) {
        this.municipioAcidente = municipioAcidente;
    }
    getNumeroSisin() {
        return this.numeroSisin;
    }
    setNumeroSisin(numeroSisin) {
        this.numeroSisin = numeroSisin;
    }
    getClassificacaoSisin() {
        return this.classificacaoSisin;
    }
    setClassificacaoSisin(classificacaoSisin) {
        this.classificacaoSisin = classificacaoSisin;
    }
    getDataAcidente() {
        return this.dataAcidente;
    }
    setDataAcidente(dataAcidente) {
        this.dataAcidente = dataAcidente;
    }
    getDataEmissaoCat() {
        return this.dataEmissaoCat;
    }
    setDataEmissaoCat(dataEmissaoCat) {
        this.dataEmissaoCat = dataEmissaoCat;
    }
    getDiasAtraso() {
        return this.diasAtraso;
    }
    setDiasAtraso(diasAtraso) {
        this.diasAtraso = diasAtraso;
    }
    getPrazo() {
        return this.prazo;
    }
    setPrazo(prazo) {
        this.prazo = prazo;
    }
    getClassificacaoGravidade() {
        return this.classificacaoGravidade;
    }
    setClassificacaoGravidade(classificacaoGravidade) {
        this.classificacaoGravidade = classificacaoGravidade;
    }
    getDataAvaliacaoMedica() {
        return this.dataAvaliacaoMedica;
    }
    setDataAvaliacaoMedica(dataAvaliacaoMedica) {
        this.dataAvaliacaoMedica = dataAvaliacaoMedica;
    }
    getRegistroSd2000() {
        return this.registroSd2000;
    }
    setRegistroSd2000(registroSd2000) {
        this.registroSd2000 = registroSd2000;
    }
    getCatSd2000() {
        return this.catSd2000;
    }
    setCatSd2000(catSd2000) {
        this.catSd2000 = catSd2000;
    }
    getSituacaoAvaliacaoMedica() {
        return this.situacaoAvaliacaoMedica;
    }
    setSituacaoAvaliacaoMedica(situacaoAvaliacaoMedica) {
        this.situacaoAvaliacaoMedica = situacaoAvaliacaoMedica;
    }
    getDataLiberacao() {
        return this.dataLiberacao;
    }
    setDataLiberacao(dataLiberacao) {
        this.dataLiberacao = dataLiberacao;
    }
    getPendenciaCorrecaoCat() {
        return this.pendenciaCorrecaoCat;
    }
    setPendenciaCorrecaoCat(pendenciaCorrecaoCat) {
        this.pendenciaCorrecaoCat = pendenciaCorrecaoCat;
    }
    getJustificativaAtrasoEmissaoCat() {
        return this.justificativaAtrasoEmissaoCat;
    }
    setJustificativaAtrasoEmissaoCat(justificativaAtrasoEmissaoCat) {
        this.justificativaAtrasoEmissaoCat = justificativaAtrasoEmissaoCat;
    }
    getNumeroCartaMultaEmpresa() {
        return this.numeroCartaMultaEmpresa;
    }
    setNumeroCartaMultaEmpresa(numeroCartaMultaEmpresa) {
        this.numeroCartaMultaEmpresa = numeroCartaMultaEmpresa;
    }
    getTipoAcidente() {
        return this.tipoAcidente;
    }
    setTipoAcidente(tipoAcidente) {
        this.tipoAcidente = tipoAcidente;
    }
    getTipoCat() {
        return this.tipoCat;
    }
    setTipoCat(tipoCat) {
        this.tipoCat = tipoCat;
    }
    getDiagnosticoProvavel() {
        return this.diagnosticoProvavel;
    }
    setDiagnosticoProvavel(diagnosticoProvavel) {
        this.diagnosticoProvavel = diagnosticoProvavel;
    }
    getAgenteCausador() {
        return this.agenteCausador;
    }
    setAgenteCausador(agenteCausador) {
        this.agenteCausador = agenteCausador;
    }
    getComunicavelSus() {
        return this.comunicavelSus;
    }
    setComunicavelSus(comunicavelSus) {
        this.comunicavelSus = comunicavelSus;
    }
    getFerimentoGraveConformeANP() {
        return this.ferimentoGraveConformeANP;
    }
    setFerimentoGraveConformeANP(ferimentoGraveConformeANP) {
        this.ferimentoGraveConformeANP = ferimentoGraveConformeANP;
    }
    getNumeroCat() {
        return this.numeroCat;
    }
    setNumeroCat(numeroCat) {
        this.numeroCat = numeroCat;
    }
    getLocalizacaoLesao() {
        return this.localizacaoLesao;
    }
    setLocalizacaoLesao(localizacaoLesao) {
        this.localizacaoLesao = localizacaoLesao;
    }
    getNaturezaLesao() {
        return this.naturezaLesao;
    }
    setNaturezaLesao(naturezaLesao) {
        this.naturezaLesao = naturezaLesao;
    }
    getDiasAfastamento() {
        return this.diasAfastamento;
    }
    setDiasAfastamento(diasAfastamento) {
        this.diasAfastamento = diasAfastamento;
    }
    getIntervaloAfastamento() {
        return this.intervaloAfastamento;
    }
    setIntervaloAfastamento(intervaloAfastamento) {
        this.intervaloAfastamento = intervaloAfastamento;
    }
    getHorasPerdidas() {
        return this.horasPerdidas;
    }
    setHorasPerdidas(horasPerdidas) {
        this.horasPerdidas = horasPerdidas;
    }
    getSalarioHora() {
        return this.salarioHora;
    }
    setSalarioHora(salarioHora) {
        this.salarioHora = salarioHora;
    }
    getCustoAcidente2() {
        return this.custoAcidente2;
    }
    setCustoAcidente2(custoAcidente2) {
        this.custoAcidente2 = custoAcidente2;
    }
    getCodigoCartaSindicato() {
        return this.codigoCartaSindicato;
    }
    setCodigoCartaSindicato(codigoCartaSindicato) {
        this.codigoCartaSindicato = codigoCartaSindicato;
    }
    getClassificacaoAnomalia() {
        return this.classificacaoAnomalia;
    }
    setClassificacaoAnomalia(classificacaoAnomalia) {
        this.classificacaoAnomalia = classificacaoAnomalia;
    }
    getDataComunicacaoSindicato() {
        return this.dataComunicacaoSindicato;
    }
    setDataComunicacaoSindicato(dataComunicacaoSindicato) {
        this.dataComunicacaoSindicato = dataComunicacaoSindicato;
    }
    getDiasAcidenteComunicacaoSindicato() {
        return this.diasAcidenteComunicacaoSindicato;
    }
    setDiasAcidenteComunicacaoSindicato(diasAcidenteComunicacaoSindicato) {
        this.diasAcidenteComunicacaoSindicato = diasAcidenteComunicacaoSindicato;
    }
    getJustificativaAtrasoEmissaoCarta() {
        return this.justificativaAtrasoEmissaoCarta;
    }
    setJustificativaAtrasoEmissaoCarta(justificativaAtrasoEmissaoCarta) {
        this.justificativaAtrasoEmissaoCarta = justificativaAtrasoEmissaoCarta;
    }
    getDataNascimento() {
        return this.dataNascimento;
    }
    setDataNascimento(dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    getIdade() {
        return this.idade;
    }
    setIdade(idade) {
        this.idade = idade;
    }
    getSexo() {
        return this.sexo;
    }
    setSexo(sexo) {
        this.sexo = sexo;
    }
    getGrauInstrucao() {
        return this.grauInstrucao;
    }
    setGrauInstrucao(grauInstrucao) {
        this.grauInstrucao = grauInstrucao;
    }
    getEstadoCivil() {
        return this.estadoCivil;
    }
    setEstadoCivil(estadoCivil) {
        this.estadoCivil = estadoCivil;
    }
    getRemuneracao() {
        return this.remuneracao;
    }
    setRemuneracao(remuneracao) {
        this.remuneracao = remuneracao;
    }
    getCargo() {
        return this.cargo;
    }
    setCargo(cargo) {
        this.cargo = cargo;
    }
    getAto1() {
        return this.ato1;
    }
    setAto1(ato1) {
        this.ato1 = ato1;
    }
    getAto2() {
        return this.ato2;
    }
    setAto2(ato2) {
        this.ato2 = ato2;
    }
    getAto3() {
        return this.ato3;
    }
    setAto3(ato3) {
        this.ato3 = ato3;
    }
    getAto4() {
        return this.ato4;
    }
    setAto4(ato4) {
        this.ato4 = ato4;
    }
}

