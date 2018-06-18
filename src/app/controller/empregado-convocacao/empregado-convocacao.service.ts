import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoFilter } from './empregado-convocacao.filter';
import { ExameService } from './../exame/exame.service';
import { ExameFilter } from './../exame/exame.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { ConvocacaoFilter } from './../convocacao/convocacao.filter';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EmpregadoConvocacaoService extends GenericService {
    
    constructor( http: Http, router: Router,
            private exameService: ExameService) { 
        super(http, router, "empregado-convocacao");
    }
    
    getExames() {
        return this.exameService.getExames();
    }
    
    getExamesAll() {
        let exameFilter: ExameFilter = new ExameFilter();
        exameFilter.setPageSize(Math.pow(2, 31)-1);       
        
        let urlList = GlobalVariable.BASE_API_URL + "/exame/selectListAll";
        return this.http
            .post( urlList, exameFilter, { headers: this.headers } )
            .toPromise();
    }
    
    getAcaoResultadoExames() {
        let urlAcao = GlobalVariable.BASE_API_URL + "/generic/acao-resultado-exame";
        return this.http
            .get( urlAcao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoResultadoExames() {
        let urlTipo = GlobalVariable.BASE_API_URL + "/generic/tipo-resultado-exame";
        return this.http
            .get( urlTipo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregado( name: string ) {
        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
        let empregadoConvocacaoFilter: EmpregadoConvocacaoFilter = new EmpregadoConvocacaoFilter();
    
        empregadoFilter.getPessoa().setNome(name);
        
        empregadoConvocacaoFilter.setEmpregado(empregadoFilter);
        
        return this.selectList(empregadoConvocacaoFilter);
    }
    
    getConvocacao( titulo: string ) {
        let convocacaoFilter: ConvocacaoFilter = new ConvocacaoFilter();
        let empregadoConvocacaoFilter: EmpregadoConvocacaoFilter = new EmpregadoConvocacaoFilter();
    
        convocacaoFilter.setTitulo(titulo);
        
        empregadoConvocacaoFilter.setConvocacao(convocacaoFilter)
        
        return this.selectList(empregadoConvocacaoFilter);
    }
    
    getExameByDescricao( descricao: string ) {
        let exameFilter: ExameFilter = new ExameFilter();
        exameFilter.setDescricao(descricao)
        
        return this.exameService.selectList( exameFilter );
    }
    
    getExameByCodigo( codigo: string ) {
        let exameFilter: ExameFilter = new ExameFilter();
        exameFilter.setCodigo( codigo );
        
        return this.exameService.selectList( exameFilter );
    }
    
    getExameService() {
        return this.exameService;
    }

}