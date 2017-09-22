import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { LocalizacaoFilter } from './localizacao.filter';
import { LocalizacaoService } from './localizacao.service';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private titulo: string = "Localizacoes";

  private formulario: FormGroup;  
  private localizacoes: Array<Object>;
  private localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
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

  constructor(private localizacaoService: LocalizacaoService, 
        private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.localizacaoService.list(this.localizacaoFilter)
      .then(res => {
          this.showPreload = false;
          this.localizacoes = JSON.parse(JSON.stringify(res.json())).list;
          this.paginas = this.getPaginas(res.json().total);
          if (res.json().total === 0){
              this.verifyEmptyPaginas = true;
          } else {
              this.verifyEmptyPaginas = false;
          }
      });
      
  }

  getPaginas(total: number) {
      let pageSize = this.localizacaoFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filterNome() {
      this.showPreload = true;
      this.localizacaoService.list(this.localizacaoFilter)
          .then(res => {
              this.localizacoes = JSON.parse(JSON.stringify(res.json())).list;
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
      this.localizacaoFilter.setPageNumber(index);
      this.localizacaoFilter.setPageSize(2);
      this.localizacaoService.list(this.localizacaoFilter)
          .then(res => {
              this.localizacoes = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              this.showPreload = false;
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.localizacaoFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.localizacaoService.delete(id)
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