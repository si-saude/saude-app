import { RegraAtendimentoLocalizacao } from './regra-atendimento-localizacao';

export class Localizacao {
    private id: number = 0;
    private nome: string;
    private regraAtendimentoLocalizacoes: Array<RegraAtendimentoLocalizacao>;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(i: number) {
        this.id = i;
    }
    
    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
    getRegraAtendimentoLocalizacoes() {
        return this.regraAtendimentoLocalizacoes;
    }
    
    setRegraAtendimentoLocalizacoes(regraAtendimentoLocalizacoes: Array<RegraAtendimentoLocalizacao>) {
        this.regraAtendimentoLocalizacoes = regraAtendimentoLocalizacoes;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(v: number) {
        this.version = v;
    }
}