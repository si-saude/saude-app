import { Component, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoService } from './empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './empregado-convocacao.filter';
import { EmpregadoConvocacaoGuard } from './../../guards/guards-child/empregado-convocacao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-empregado-convocacao',
  templateUrl: './empregado-convocacao.component.html',
  styleUrls: ['./empregado-convocacao.component.css', '../../../assets/css/list-component.css']
})

export class EmpregadoConvocacaoComponent 
    extends GenericListComponent<EmpregadoConvocacao, EmpregadoConvocacaoFilter, EmpregadoConvocacaoGuard> {
    @ViewChild( 'arquivoTxt' ) inputElArquivoTxt: ElementRef;
    
    constructor(empregadoConvocacaoService: EmpregadoConvocacaoService,
                empregadoConvocacaoGuard: EmpregadoConvocacaoGuard,
                router: Router) {
        super(empregadoConvocacaoService, new EmpregadoConvocacaoFilter(), empregadoConvocacaoGuard, router);
    }   
    
    
    importFileTxt() {
        let arquivo = undefined;
        
        if(this.inputElArquivoTxt.nativeElement.files.length > 0){
            arquivo = this.inputElArquivoTxt.nativeElement.files[0];
            this.showPreload = true;
            this.service.sendFileWithPath(arquivo, "import-txt")
                .then(res => {
                    this.showPreload = false;
                    location.reload();
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        } else {
            console.log('falta selecionar arquivo');
        }
    }
}