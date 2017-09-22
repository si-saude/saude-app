import { Component, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../global';
import { Perfil } from './../model/perfil';
import { PerfilService } from './perfil.service';
import { PerfilFilter } from './perfil.filter';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private titulo = "Perfis";
  private corTitulo = GlobalVariable.COLOR_TITLE;
  
  private formulario: FormGroup;  
  private permissoesArray: FormArray;  
  private funcoes: Array<Object>;
  private perfilFilter: PerfilFilter = new PerfilFilter();
  private perfis: Perfil[] = [];
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
  
  constructor(private perfilService: PerfilService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.perfilService.list(this.perfilFilter)
          .then(res => {
              this.showPreload = false;
              this.perfis = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              if (res.json().total === 0){
                  this.verifyEmptyPaginas = true;
              } else {
                  this.verifyEmptyPaginas = false;
              }
      });
  }
  
  getPaginas(total: number) {
      let pageSize = this.perfilFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filterTitulo() {
      this.showPreload = true;
      this.perfilService.list(this.perfilFilter)
      .then(res => {
          this.perfis = JSON.parse(JSON.stringify(res.json())).list;
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
      this.perfilFilter.setPageNumber(index);
      this.perfilFilter.setPageSize(2);
      this.perfilService.list(this.perfilFilter)
          .then(res => {
              this.perfis = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              this.showPreload = false;
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.perfilFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.perfilService.delete(id)
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