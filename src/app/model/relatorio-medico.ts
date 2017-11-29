import { Profissional } from './profissional';
import { EmpregadoConvocacaoExame } from './empregado-convocacao-exame';

export class RelatorioMedico {
    private id: number = 0;
    private medico: Profissional;
    private empregadoConvocacaoExame: EmpregadoConvocacaoExame;
    private medicoPrestador: string;
    private resumo: string;
    private questionamentos: string;
    private finalizado: boolean;
    private version: number;
    
    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getMedico() {
        return this.medico;
    }

    setMedico(medico: Profissional) {
        this.medico = medico;
    }
    
    getEmpregadoConvocacaoExame() {
        return this.empregadoConvocacaoExame;
    }
    
    setEmpregadoConvocacaoExame(empregadoConvocacaoExame: EmpregadoConvocacaoExame) {
        this.empregadoConvocacaoExame = empregadoConvocacaoExame;
    }
    
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
    
    setFinalizado(finalizado: boolean) {
        this.finalizado = finalizado;
    }
    
    getVersion() {
        return this.version;
    } 
     
    setVersion(version: number) {
        this.version = version;
    }
    
}