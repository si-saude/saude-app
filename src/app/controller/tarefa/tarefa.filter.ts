import { ServicoFilter } from './../servico/servico.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { DateFilter } from './../../generics/date.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class TarefaFilter extends GenericFilter {
    private inicio: DateFilter = new DateFilter();
    private fim: DateFilter;
    private horario: DateFilter;
    private atualizacao: DateFilter;
    private servico: ServicoFilter = new ServicoFilter();
    private cliente: EmpregadoFilter;
    private responsavel: ProfissionalSaudeFilter;
    private equipe: EquipeFilter;
    private status: string;

    getHorario() {
        return this.horario;
    }

    setHorario(horario: DateFilter) {
        this.horario = horario;
    }

    getAtualizacao() {
        return this.atualizacao;
    }

    setAtualizacao(atualizacao: DateFilter) {
        this.atualizacao = atualizacao;
    }
    
    getInicio() {
        return this.inicio;
    }

    setInicio(inicio: DateFilter) {
        this.inicio = inicio;
    }
    
    getFim() {
        return this.fim;
    }
    
    setFim(fim: DateFilter) {
        this.fim = fim;
    }

    getServico() {
        return this.servico;
    }

    setServico(servico: ServicoFilter) {
        this.servico = servico;
    }

    getCliente() {
        return this.cliente;
    }

    setCliente(cliente: EmpregadoFilter) {
        this.cliente = cliente;
    }

    getResponsavel() {
        return this.responsavel;
    }

    setResponsavel(responsavel: ProfissionalSaudeFilter) {
        this.responsavel = responsavel;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: EquipeFilter) {
        this.equipe = equipe;
    }

    getStatus() {
        return status;
    }

    setStatus(status: string) {
        this.status = status;
    }

}
