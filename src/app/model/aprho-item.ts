import { Aprho } from './aprho';
import { AgenteRisco } from './agente-risco';
import { PossivelDanoSaude } from './possivel-dano-saude';
import { CategoriaRisco } from './categoria-risco';
import { FonteGeradora } from './fonte-geradora';

export class AprhoItem {
 
    private id: number = 0;
    private aprho: Aprho;
    private agenteRisco: AgenteRisco;
    private possivelDanoSaude: PossivelDanoSaude;
    private categoriaRisco: CategoriaRisco;
    private meioPropagacao: string;
    private medidaControle: string;
    private fonteGeradora: FonteGeradora;
    private atividade: string;
    private local: string;
    private frequencia: string;
    private duracao: string;
    private version: number;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    public getAprho() {
        return this.aprho;
    }

    public setAprho(aprho: Aprho) {
        this.aprho = aprho;
    }
    
    public getAgenteRisco() {
        return this.agenteRisco;
    }

    public setAgenteRisco(agenteRisco: AgenteRisco) {
        this.agenteRisco = agenteRisco;
    }
    
    public getPossivelDanoSaude() {
        return this.possivelDanoSaude;
    }

    public setPossivelDanoSaude(possivelDanoSaude: PossivelDanoSaude) {
        this.possivelDanoSaude = possivelDanoSaude;
    }
    
    public getCategoriaRisco() {
        return this.categoriaRisco;
    }

    public setCategoriaRisco(categoriaRisco: CategoriaRisco) {
        this.categoriaRisco = categoriaRisco;
    }
    
    getMeioPropagacao(): string {
        return this.meioPropagacao;
    }
    
    setMeioPropagacao(meioPropagacao: string) {
        this.meioPropagacao = meioPropagacao;
    }
    
    getMedidaControle(): string {
        return this.medidaControle;
    }
    
    setMedidaControle(medidaControle: string) {
        this.medidaControle = medidaControle;
    }
    
    public getFonteGeradora() {
        return this.fonteGeradora;
    }
    
   public setFonteGeradora(fonteGeradora: FonteGeradora) {
        this.fonteGeradora = fonteGeradora;
    }
    
    getAtividade(): string {
        return this.atividade;
    }
    
    setAtividade(atividade: string) {
        this.atividade = atividade;
    }    
    
    getLocal(): string {
        return this.local;
    }
    
    setLocal(local: string) {
        this.local = local;
    }
    
    getFrequencia(): string {
        return this.frequencia;
    }
    
    setFrequencia(frequencia: string) {
        this.frequencia = frequencia;
    }
    
    getDuracao(): string {
        return this.duracao;
    }
    
    setDuracao(duracao: string) {
        this.duracao = duracao;
    }   
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
  
}