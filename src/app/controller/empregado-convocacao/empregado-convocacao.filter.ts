import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { ConvocacaoFilter } from './../convocacao/convocacao.filter';

export class EmpregadoConvocacaoFilter extends GenericFilter {
    private empregado:EmpregadoFilter = new EmpregadoFilter();
    private convocacao:ConvocacaoFilter = new ConvocacaoFilter();
    private convocado:BooleanFilter = new BooleanFilter();
    private auditado:BooleanFilter = new BooleanFilter();
    private auditadoSd2000:BooleanFilter = new BooleanFilter();
    private resultadoAuditado:BooleanFilter = new BooleanFilter();
    
    public getEmpregado():EmpregadoFilter{
        return this.empregado;
    }
    
    public setEmpregado(empregado:EmpregadoFilter){
        this.empregado = empregado;
    }
    
    public getConvocacao():ConvocacaoFilter{
        return this.convocacao;
    }
    
    public setConvocacao(convocacao:ConvocacaoFilter){
        this.convocacao = convocacao;
    }
    
    public getConvocado():BooleanFilter{
        return this.convocado;
    }
    
    public setConvocado(convocado:BooleanFilter){
        this.convocado = convocado;
    }
    
    public getAuditado():BooleanFilter{
        return this.auditado;
    }
    
    public setAuditado(auditado:BooleanFilter){
        this.auditado = auditado;
    }
    
    public getAuditadoSd2000():BooleanFilter{
        return this.auditadoSd2000;
    }
    
    public setAuditadoSd2000(auditadoSd2000:BooleanFilter){
        this.auditadoSd2000 = auditadoSd2000;
    }
    
    public getResultadoAuditado():BooleanFilter{
        return this.resultadoAuditado;
    }
    
    public setResultadoAuditado(resultadoAuditado:BooleanFilter){
        this.resultadoAuditado = resultadoAuditado;
    }
}