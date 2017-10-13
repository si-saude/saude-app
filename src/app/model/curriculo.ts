import { Profissional } from './profissional';
import { CurriculoCurso } from './curriculo-curso';

export class Curriculo {
    private id: number = 0;
    private historico: string;
    private formacao: string;
    private atuacao: string;
    private profissional: Profissional;
    private curriculoCursos: Array<CurriculoCurso>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getHistorico() {
        return this.historico;
    }

    setHistorico(historico: string) {
        this.historico = historico;
    }

    getFormacao() {
        return this.formacao;
    }

    setFormacao(formacao: string) {
        this.formacao = formacao;
    }

    getAtuacao() {
        return this.atuacao;
    }

    setAtuacao(atuacao: string) {
        this.atuacao = atuacao;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getCurriculoCursos() {
        return this.curriculoCursos;
    }

    setCurriculoCursos(curriculoCursos: Array<CurriculoCurso>) {
        this.curriculoCursos = curriculoCursos;
    }
    
}
