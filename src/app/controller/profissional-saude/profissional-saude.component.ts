import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { ProfissionalSaude } from './../../model/profissional-saude';
import { ProfissionalSaudeService } from './profissional-saude.service';
import { ProfissionalSaudeFilter } from './profissional-saude.filter';

@Component({
  selector: 'app-profissional-saude',
  templateUrl: './profissional-saude.component.html',
  styleUrls: ['./profissional-saude.component.css']
})
export class ProfissionalSaudeComponent implements OnInit {

    private titulo = "Profissionais de saúde";
    private corTitulo = GlobalVariable.COLOR_TITLE;
    
    private formulario: FormGroup;  
    private profissionaisSaude: Array<ProfissionalSaude>;
    private profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    private paginas: number[];
    
    private msgError: string = '';
    private verifyError: boolean = false;
    private verifyEmptyPaginas: boolean = false;
    private msgEmptyPaginas: string = "Nenhum registro encontrado.";
    private colorEmptyPaginas: string = "orange";
    private showPreload: boolean = true;
    private msgPreload: string = "Aguarde processamento...";
    
    modalActions = new EventEmitter<string|MaterializeAction>();
    modelParams = [{
        dismissible: false,
        complete: function() { }
    }]
    
    constructor(private profissionalSaudeService: ProfissionalSaudeService, 
            private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.profissionalSaudeService.list(this.profissionalSaudeFilter)
            .then(res => {
                this.showPreload = false;
                this.profissionaisSaude = JSON.parse(JSON.stringify(res.json())).list;
                this.paginas = this.getPaginas(res.json().total);
                if (res.json().total === 0){
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            })
            .catch(error => {
                this.showPreload = false;
                this.verifyError = true;
                this.msgError = error.text();
            })
    }
    
    getPaginas(total: number) {
        let pageSize = this.profissionalSaudeFilter.getPageSize();
        if ( total % pageSize > 0 ) {
            return Array(Math.floor((total / pageSize)+1));
        } else {
            return Array(total / pageSize);
        }
    }
    
    filter() {
        
    }
    
    openModal() {
        this.modalActions.emit({action:"modal",params:['open']});
    }
    
    closeModal() {
        this.modalActions.emit({action:"modal",params:['close']});
    }
    
    goToPage(index: number) {
        this.showPreload = true;
        if (index < 1 || index > this.paginas.length) {
            this.showPreload = false;
            return;
        }
        this.profissionalSaudeFilter.setPageNumber(index);
        this.profissionalSaudeFilter.setPageSize(4);
        this.profissionalSaudeService.list(this.profissionalSaudeFilter)
            .then(res => {
                this.profissionaisSaude = JSON.parse(JSON.stringify(res.json())).list;
                this.paginas = this.getPaginas(res.json().total);
                this.showPreload = false;
             })
             .catch(error => {
                 console.log(error);
             });
    }
    
    activePage(index: number) {
        if (index === this.profissionalSaudeFilter.getPageNumber()) {
            return 'active';
        } else {
            return '';
        }
    }
    
    delete(id) {
        this.showPreload = true;
        this.profissionalSaudeService.delete(id)
            .then(res => {
                this.showPreload = false;
                window.location.reload();
            })
            .catch(error => {
                this.showPreload = false;
                console.log(error.text());
            })
        
    }
      
  }