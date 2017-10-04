import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Cidade } from './../../model/cidade';
import { CidadeService } from './cidade.service';
import { CidadeFilter } from './cidade.filter';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  private titulo = "Funções";
  private corTitulo = GlobalVariable.COLOR_TITLE;
  
  private formulario: FormGroup;  
  private cidades: Array<Cidade>;
  private cidadeFilter: CidadeFilter = new CidadeFilter();
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
  
  constructor(private cidadeService: CidadeService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.cidadeService.list(this.cidadeFilter)
          .then(res => {
              this.showPreload = false;
              this.cidades = JSON.parse(JSON.stringify(res.json())).list;
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
      let pageSize = this.cidadeFilter.getPageSize();
      if ( total % pageSize > 0 ) {
          return Array(Math.floor((total / pageSize)+1)); 
      } else {
          return Array(total / pageSize);
      }
  }
  
  filter() {
      this.showPreload = true;
      this.cidadeService.list(this.cidadeFilter)
      .then(res => {
          this.cidades = JSON.parse(JSON.stringify(res.json())).list;
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
      this.cidadeFilter.setPageNumber(index);
      this.cidadeFilter.setPageSize(2);
      this.cidadeService.list(this.cidadeFilter)
          .then(res => {
              this.showPreload = false;
              this.cidades = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
           })
           .catch(error => {
               console.log(error);
           });
  }
  
  activePage(index: number) {
      if (index === this.cidadeFilter.getPageNumber()) {
          return 'active';
      } else {
          return '';
      }
  }
  
  delete(id) {
      this.showPreload = true;
      this.cidadeService.delete(id)
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