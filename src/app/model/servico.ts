import { Atividade } from './atividade';
import { RegraAtendimento } from './regra-atendimento';

export class Servico {
    private id: number;
    private nome: string;
    private codigo: string;
    private grupo: string = "";
    private url: string;
    private publico: boolean;
    private atividades: Array<Atividade>;
    private intervalo: number;
    private quantidadeSolicitacaoIntervalo: number;
    private regraAtendimento: RegraAtendimento;
    private version: number;

    public getId() {
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

    getCodigo() {
        return this.codigo;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    getGrupo() {
        return this.grupo;
    }

    setGrupo(grupo: string) {
        this.grupo = grupo;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url: string) {
        this.url = url;
    }
    
    isPublico() {
        return this.publico;
    }

    setPublico(publico: boolean) {
        this.publico = publico;
    }
    
    getAtividades() {
        return this.atividades;
    }

    setAtividades(atividades: Array<Atividade>) {
        this.atividades = atividades;
    }
    
    getIntervalo() {
        return this.intervalo;
    }
    
    setIntervalo(intervalo: number) {
        this.intervalo = intervalo;
    }
    
    getQuantidadeSolicitacaoIntervalo() {
        return this.quantidadeSolicitacaoIntervalo;
    }
    
    setQuantidadeSolicitacaoIntervalo(quantidadeSolicitacaoIntervalo: number) {
        this.quantidadeSolicitacaoIntervalo = quantidadeSolicitacaoIntervalo;
    }
    
    getRegraAtendimento() {
        return this.regraAtendimento;
    }
    
    setRegraAtendimento(regraAtendimento: RegraAtendimento) {
        this.regraAtendimento = regraAtendimento;
    }
    
    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
