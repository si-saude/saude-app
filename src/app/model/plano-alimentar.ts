import { RefeicaoPlano } from './refeicao-plano';
import { Atendimento } from './atendimento';

export class PlanoAlimentar {
    private id: number;
    private refeicoes: Array<RefeicaoPlano> ;
    private atendimento: Atendimento;
    private ne: number;
    private tmb: number;
    private version: number;
    private objetivo :string;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getRefeicoes() {
        return this.refeicoes;
    }

    public setRefeicoes(refeicoes) {
        this.refeicoes = refeicoes;
    }

    public getAtendimento() {
        return this.atendimento;
    }

    public setAtendimento(atendimento) {
        this.atendimento = atendimento;
    }

    public getNe() {
        return this.ne;
    }

    public setNe(ne) {
        this.ne = ne;
    }
    
    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
    public getTmb() {
        return this.tmb;
    }

    public setTmb(tmb) {
        this.tmb = tmb;
    }
    getObjetivo():string{
        return this.objetivo;
    }
    
    setObjetivo(objetivo:string){
        this.objetivo = objetivo;
    }
}
