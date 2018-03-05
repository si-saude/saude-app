import { Equipe } from './equipe';
import { IndicadorAssociadoSast } from './indicador-associado-sast';

export class IndicadorSast {
    private id: number;
    private nome: string;
    private indice0: string;
    private indice1: string;
    private indice2: string;
    private indice3: string;
    private indice4: string;
    private obrigatorio: boolean;
    private inativo: boolean;
    private ausenteCalculoInterdisciplinar: boolean;
    private codigo: string;
    private codigoExcludente: string;
    private critico: number = -1;
    private equipe: Equipe;
    private indicadorAssociadoSasts: Array<IndicadorAssociadoSast>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    getIndice0() {
        return this.indice0;
    }

    setIndice0(indice0: string) {
        this.indice0 = indice0;
    }

    getIndice1() {
        return this.indice1;
    }

    setIndice1(indice1: string) {
        this.indice1 = indice1;
    }

    getIndice2() {
        return this.indice2;
    }

    setIndice2(indice2: string) {
        this.indice2 = indice2;
    }

    getIndice3() {
        return this.indice3;
    }

    setIndice3(indice3: string) {
        this.indice3 = indice3;
    }

    getIndice4() {
        return this.indice4;
    }

    setIndice4(indice4: string) {
        this.indice4 = indice4;
    }

    getObrigatorio() {
        return this.obrigatorio;
    }

    setObrigatorio(obrigatorio: boolean) {
        this.obrigatorio = obrigatorio;
    }

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    getCodigoExcludente() {
        return this.codigoExcludente;
    }

    setCodigoExcludente(codigoExcludente: string) {
        this.codigoExcludente = codigoExcludente;
    }

    getCritico() {
        return this.critico;
    }

    setCritico(critico: number) {
        this.critico = critico;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }
    
    getIndicadorAssociadoSasts() {
        return this.indicadorAssociadoSasts;
    }

    setIndicadorAssociadoSasts(indicadorAssociadoSasts: Array<IndicadorAssociadoSast>) {
        this.indicadorAssociadoSasts = indicadorAssociadoSasts;
    }

    getInativo() {
        return this.inativo;
    }

    setInativo(inativo: boolean) {
        this.inativo = inativo;
    }
    
    getAusenteCalculoInterdisciplinar() {
        return this.ausenteCalculoInterdisciplinar;
    }

    setAusenteCalculoInterdisciplinar(ausenteCalculoInterdisciplinar: boolean) {
        this.ausenteCalculoInterdisciplinar = ausenteCalculoInterdisciplinar;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
