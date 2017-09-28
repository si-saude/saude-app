import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Funcao } from './../../model/funcao';
import { FuncaoService } from './funcao.service';
import { FuncaoFilter } from './funcao.filter';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.css']
})
export class FuncaoComponent implements OnInit {

  private titulo = "Funções";
  private corTitulo = GlobalVariable.COLOR_TITLE;
  
  private formulario: FormGroup;  
  private funcoes: Array<Funcao>;
  private funcaoFilter: FuncaoFilter = new FuncaoFilter();
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
  
  constructor(private funcaoService: FuncaoService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.funcaoService.list(this.funcaoFilter)
          .then(res => {
              this.showPreload = false;
              this.funcoes = JSON.parse(JSON.stringify(res.json())).list;
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
      let pageSize = this.funcaoFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filter() {
      this.showPreload = true;
      this.funcaoService.list(this.funcaoFilter)
      .then(res => {
          this.funcoes = JSON.parse(JSON.stringify(res.json())).list;
          this.paginas = this.getPaginas(res.json().total);
          if (res.json().total === 0) {
              this.verifyEmptyPaginas = true;
          } else {
              this.verifyEmptyPaginas = false;
          }
          this.showPreload = false;
       });
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
      this.funcaoFilter.setPageNumber(index);
      this.funcaoFilter.setPageSize(2);
      this.funcaoService.list(this.funcaoFilter)
          .then(res => {
              this.funcoes = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              this.showPreload = false;
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.funcaoFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.funcaoService.delete(id)
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