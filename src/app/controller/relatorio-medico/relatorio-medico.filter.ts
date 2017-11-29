import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class RelatorioMedicoFilter extends GenericFilter {
    private medicoPrestador: string;
    private resumo: string;
    private questionamentos: string;
    private finalizado: BooleanFilter;
    
    getMedicoPrestador() {
        return this.medicoPrestador;
    }
    
    setMedicoPrestador(medicoPrestador: string) {
        this.medicoPrestador = medicoPrestador;
    }
    
    getResumo() {
        return this.resumo;
    }
    
    setResumo(resumo: string) {
        this.resumo = resumo;
    }
    
    getQuestionamentos() {
        return this.questionamentos;
    }
    
    setQuestionamentos(questionamentos: string) {
        this.questionamentos = questionamentos;
    }
    
    getFinalizado() {
        return this.finalizado;
    }
    
    setFinalizado(finalizado: BooleanFilter) {
        this.finalizado = finalizado;
    }

}