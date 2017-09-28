import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaService } from './gerencia.service';
import { GerenciaFilter } from './gerencia.filter';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.css']
})
export class GerenciaComponent implements OnInit {

  private titulo = "Gerencias";
  private corTitulo = GlobalVariable.COLOR_TITLE;
  
  private formulario: FormGroup;  
  private permissoesArray: FormArray;  
  private gerencias: Array<Gerencia>;
  private gerenciaFilter: GerenciaFilter = new GerenciaFilter();
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
  
  constructor(private gerenciaService: GerenciaService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.gerenciaService.list(this.gerenciaFilter)
          .then(res => {
              this.showPreload = false;
              this.gerencias = JSON.parse(JSON.stringify(res.json())).list;
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
      let pageSize = this.gerenciaFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filter() {
      this.showPreload = true;
      this.gerenciaService.list(this.gerenciaFilter)
      .then(res => {
          this.gerencias = JSON.parse(JSON.stringify(res.json())).list;
          this.paginas = this.getPaginas(res.json().total);
          if (res.json().total === 0){
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
      this.gerenciaFilter.setPageNumber(index);
      this.gerenciaFilter.setPageSize(2);
      this.gerenciaService.list(this.gerenciaFilter)
          .then(res => {
              this.gerencias = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              this.showPreload = false;
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.gerenciaFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.gerenciaService.delete(id)
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