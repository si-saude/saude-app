import { AlimentoMedidaAlimentar } from './alimento-medida-alimentar';

export class Alimento {
    private id: number;
    private nome: string;
    private tipo: string;
    private padrao: number;
    private energia: number;
    private proteina: number;
    private lipideos: number;
    private saturada: number;
    private monoinsaturada: number;
    private poliinsaturada: number;
    private omega6: number;
    private omega3: number;
    private colesterol: number;
    private cho: number;
    private fibra: number;
    private calcio: number;
    private mg: number;
    private mn: number;
    private p: number;
    private ferro: number;
    private sodio: number;
    private potassio: number;
    private cobre: number;
    private zinco: number;
    private retinol: number;
    private tiamina: number;
    private riboflavina: number;
    private piridoxina: number;
    private niacina: number;
    private vitc: number;
    private vitd: number;
    private vite: number;
    private inativo: boolean;
    private tipoCarboidrato: string;
    private alimentoMedidaAlimentares: Array<AlimentoMedidaAlimentar>;
    private substituicoes: Array<Alimento>;

    private version: number;
    
    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getNome() {
        return this.nome;
    }
    public setNome(nome) {
        this.nome = nome;
    }
    public getTipo() {
        return this.tipo;
    }
    public setTipo(tipo) {
        this.tipo = tipo;
    }    
    public getTipoCarboidrato() {
        return this.tipoCarboidrato;
    }
    public setTipoCarboidrato(tipoCarboidrato) {
        this.tipoCarboidrato = tipoCarboidrato;
    }        
    public getPadrao() {
        return this.padrao;
    }
    public setPadrao(padrao) {
        this.padrao = padrao;
    }
    public getEnergia() {
        return this.energia;
    }
    public setEnergia(energia) {
        this.energia = energia;
    }
    public getProteina() {
        return this.proteina;
    }
    public setProteina(proteina) {
        this.proteina = proteina;
    }
    public getLipideos() {
        return this.lipideos;
    }
    public setLipideos(lipideos) {
        this.lipideos = lipideos;
    }
    public getSaturada() {
        return this.saturada;
    }
    public setSaturada(saturada) {
        this.saturada = saturada;
    }
    public getMonoinsaturada() {
        return this.monoinsaturada;
    }
    public setMonoinsaturada(monoinsaturada) {
        this.monoinsaturada = monoinsaturada;
    }
    public getPoliinsaturada() {
        return this.poliinsaturada;
    }
    public setPoliinsaturada(poliinsaturada) {
        this.poliinsaturada = poliinsaturada;
    }
    public getOmega6() {
        return this.omega6;
    }
    public setOmega6(omega6) {
        this.omega6 = omega6;
    }
    public getOmega3() {
        return this.omega3;
    }
    public setOmega3(omega3) {
        this.omega3 = omega3;
    }
    public getColesterol() {
        return this.colesterol;
    }
    public setColesterol(colesterol) {
        this.colesterol = colesterol;
    }
    public getCho() {
        return this.cho;
    }
    public setCho(cho) {
        this.cho = cho;
    }
    public getFibra() {
        return this.fibra;
    }
    public setFibra(fibra) {
        this.fibra = fibra;
    }
    public getCalcio() {
        return this.calcio;
    }
    public setCalcio(calcio) {
        this.calcio = calcio;
    }
    public getMg() {
        return this.mg;
    }
    public setMg(mg) {
        this.mg = mg;
    }
    public getMn() {
        return this.mn;
    }
    public setMn(mn) {
        this.mn = mn;
    }
    public getP() {
        return this.p;
    }
    public setP(p) {
        this.p = p;
    }
    public getFerro() {
        return this.ferro;
    }
    public setFerro(ferro) {
        this.ferro = ferro;
    }
    public getSodio() {
        return this.sodio;
    }
    public setSodio(sodio) {
        this.sodio = sodio;
    }
    public getPotassio() {
        return this.potassio;
    }
    public setPotassio(potassio) {
        this.potassio = potassio;
    }
    public getCobre() {
        return this.cobre;
    }
    public setCobre(cobre) {
        this.cobre = cobre;
    }
    public getZinco() {
        return this.zinco;
    }
    public setZinco(zinco) {
        this.zinco = zinco;
    }
    public getRetinol() {
        return this.retinol;
    }
    public setRetinol(retinol) {
        this.retinol = retinol;
    }
    public getTiamina() {
        return this.tiamina;
    }
    public setTiamina(tiamina) {
        this.tiamina = tiamina;
    }
    public getRiboflavina() {
        return this.riboflavina;
    }
    public setRiboflavina(riboflavina) {
        this.riboflavina = riboflavina;
    }
    public getPiridoxina() {
        return this.piridoxina;
    }
    public setPiridoxina(piridoxina) {
        this.piridoxina = piridoxina;
    }
    public getNiacina() {
        return this.niacina;
    }
    public setNiacina(niacina) {
        this.niacina = niacina;
    }
    public getVitc() {
        return this.vitc;
    }
    public setVitc(vitc) {
        this.vitc = vitc;
    }
    public getVitd() {
        return this.vitd;
    }
    public setVitd(vitd) {
        this.vitd = vitd;
    }
    public getVite() {
        return this.vite;
    }
    public setVite(vite) {
        this.vite = vite;
    }
    public getVersion() {
        return this.version;
    }
    public setVersion(version) {
        this.version = version;
    }
    public getInativo() {
        return this.inativo;
    }
    public setInativo(inativo) {
        this.inativo = inativo;
    }
    public getAlimentoMedidaAlimentares() {
        return this.alimentoMedidaAlimentares;
    }
    public setAlimentoMedidaAlimentares(alimentoMedidaAlimentares) {
        this.alimentoMedidaAlimentares = alimentoMedidaAlimentares;
    }
    public getSubstituicoes() {
        return this.substituicoes;
    }
    public setSubstituicoes(substituicoes) {
        this.substituicoes = substituicoes;
    }
}
