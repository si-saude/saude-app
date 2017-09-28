import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Curso } from './../../model/curso';
import { CursoService } from './curso.service';
import { CursoFilter } from './curso.filter';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  private titulo = "Funções";
  private corTitulo = GlobalVariable.COLOR_TITLE;
  
  private formulario: FormGroup;  
  private cursos: Array<Curso>;
  private cursoFilter: CursoFilter = new CursoFilter();
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
  
  constructor(private cursoService: CursoService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.cursoService.list(this.cursoFilter)
          .then(res => {
              this.showPreload = false;
              this.cursos = JSON.parse(JSON.stringify(res.json())).list;
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
      let pageSize = this.cursoFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filter() {
      this.showPreload = true;
      this.cursoService.list(this.cursoFilter)
      .then(res => {
          this.cursos = JSON.parse(JSON.stringify(res.json())).list;
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
      this.cursoFilter.setPageNumber(index);
      this.cursoFilter.setPageSize(2);
      this.cursoService.list(this.cursoFilter)
          .then(res => {
              this.showPreload = false;
              this.cursos = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.cursoFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.cursoService.delete(id)
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