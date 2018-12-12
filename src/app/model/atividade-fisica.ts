export class AtividadeFisica {
    private id: number;
    private descricao: string;
    private domingo: boolean;
    private segunda: boolean;
    private terca: boolean;
    private quarta: boolean;
    private quinta: boolean;
    private sexta: boolean;
    private sabado: boolean;
    private minuto: number;
    private totalMinuto: number;
    private classificacao: string;
    private observacao: string;
    private version: number;
    
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }
    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }

    getDomingo() {
        return this.domingo;
    }

    setDomingo(domingo) {
        this.domingo = domingo;
    }

    getSegunda() {
        return this.segunda;
    }

    setSegunda(segunda) {
        this.segunda = segunda;
    }

    getTerca() {
        return this.terca;
    }

    setTerca(terca) {
        this.terca = terca;
    }

    getQuarta() {
        return this.quarta;
    }

    setQuarta(quarta) {
        this.quarta = quarta;
    }

    getQuinta() {
        return this.quinta;
    }

    setQuinta(quinta) {
        this.quinta = quinta;
    }

    getSexta() {
        return this.sexta;
    }

    setSexta(sexta) {
        this.sexta = sexta;
    }

    getSabado() {
        return this.sabado;
    }

    setSabado(sabado) {
        this.sabado = sabado;
    }

    getMinuto() {
        return this.minuto;
    }

    setMinuto(minuto) {
        this.minuto = minuto;
    }

    getTotalMinuto() {
        return this.totalMinuto;
    }

    setTotalMinuto(totalMinuto) {
        this.totalMinuto = totalMinuto;
    }

    getClassificacao() {
        return this.classificacao;
    }

    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }

    getObservacao() {
        return this.observacao;
    }

    setObservacao(observacao) {
        this.observacao = observacao;
    }
    
    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }

}
