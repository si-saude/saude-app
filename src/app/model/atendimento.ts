import { FilaAtendimentoOcupacional } from './fila-atendimento-ocupacional';
import { FilaEsperaOcupacional } from './fila-espera-ocupacional';
import { Tarefa } from './tarefa';
import { Aso } from './aso';
import { Triagem } from './triagem';
import { RegraAtendimento } from './regra-atendimento';
import { QuestionarioConhecimentoAlimentar } from './questionario-conhecimento-alimentar';
import { Recordatorio } from './recordatorio';
import { AvaliacaoFisica } from './avaliacao-fisica';

export class Atendimento {
    private id: number;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private filaEsperaOcupacional: FilaEsperaOcupacional;
    private triagens: Array<Triagem>;
    private tarefa: Tarefa;
    private aso: Aso;
    private triagensTodosAtendimentos: Array<Triagem>;
    private questionario: QuestionarioConhecimentoAlimentar;
    private recordatorio: Recordatorio;
    private avaliacaoFisica: AvaliacaoFisica;
    private tipo: string;
    private version: number;

    getId() {
        return this.id;
    }

    setId( id: number ) {
        this.id = id;
    }

    getFilaAtendimentoOcupacional() {
        return this.filaAtendimentoOcupacional;
    }

    setFilaAtendimentoOcupacional( filaAtendimentoOcupacional: FilaAtendimentoOcupacional ) {
        this.filaAtendimentoOcupacional = filaAtendimentoOcupacional;
    }

    getFilaEsperaOcupacional() {
        return this.filaEsperaOcupacional;
    }

    setFilaEsperaOcupacional( filaEsperaOcupacional: FilaEsperaOcupacional ) {
        this.filaEsperaOcupacional = filaEsperaOcupacional;
    }

    getTarefa() {
        return this.tarefa;
    }

    setTarefa( tarefa: Tarefa ) {
        this.tarefa = tarefa;
    }

    getTriagens() {
        return this.triagens;
    }

    setTriagens( triagens: Array<Triagem> ) {
        this.triagens = triagens;
    }

    getVersion() {
        return this.version;
    }

    setVersion( version: number ) {
        this.version = version;
    }

    getAso() {
        return this.aso;
    }

    setAso( aso: Aso ) {
        this.aso = aso;
    }

    getTriagensTodosAtendimentos() {
        return this.triagensTodosAtendimentos;
    }

    setTriagensTodosAtendimentos( triagensTodosAtendimentos: Array<Triagem> ) {
        this.triagensTodosAtendimentos = triagensTodosAtendimentos;
    }

    getQuestionario() {
        return this.questionario;
    }

    setQuestionario( questionario ) {
        this.questionario = questionario;
    }
    
    getRecordatorio() {
        return this.recordatorio;
    }

    setRecordatorio( recordatorio ) {
        this.recordatorio = recordatorio;
    }
    
    getAvaliacaoFisica () {
        return this.avaliacaoFisica;
    }

    setAvaliacaoFisica ( avaliacaoFisica ) {
        this.avaliacaoFisica = avaliacaoFisica;
    }
    
    getTipo() {
        return this.tipo;
    }

    setTipo( tipo: string ) {
        this.tipo = tipo;
    }
}