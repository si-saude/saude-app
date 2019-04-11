import { Alimento } from './alimento';
import { MedidaAlimentar } from './medida-alimentar';
import { RefeicaoPlano } from './refeicao-plano';

export class ItemRefeicaoPlano {
    private id: number;
    private alimento: Alimento;
    private medidaCaseira: MedidaAlimentar;
    private refeicao: RefeicaoPlano;
    private quantidade: number;
    private observacao: string;
    private ve: number;
    private version: number;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getAlimento() {
        return this.alimento;
    }

    public setAlimento(alimento) {
        this.alimento = alimento;
    }

    public getMedidaCaseira() {
        return this.medidaCaseira;
    }

    public setMedidaCaseira(medidaCaseira) {
        this.medidaCaseira = medidaCaseira;
    }

    public getQuantidade() {
        return this.quantidade;
    }

    public setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }

    public getVe() {
        return this.ve;
    }

    public setVe(ve) {
        this.ve = ve;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }

    public getRefeicao() {
        return this.refeicao;
    }

    public setRefeicao(refeicao) {
        this.refeicao = refeicao;
    }
    
    getObservacao():string {
        return this.observacao;
    }

    setObservacao(observacao:string) {
        this.observacao = observacao;
    }
    
}
