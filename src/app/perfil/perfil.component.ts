import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { Perfil } from './../model/perfil';
import { PerfilService } from './perfil.service';
import { PerfilFilter } from './perfil.filter';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private titulo = "Listar Perfis";
  private formulario: FormGroup;  
  private permissoesArray: FormArray;  
  private funcoes: Array<Object>;
  private perfilFilter: PerfilFilter = new PerfilFilter();
  private perfis: Perfil[] = [];
  private paginas: number[];
  
  private msgError: string = '';
  private verifyError: boolean = false;
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  modelParams = [{
      dismissible: false,
      complete: function() { console.log('Closed'); }
  }]
  
  constructor(private http: Http, 
          private perfilService: PerfilService, 
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.perfilService.list(this.perfilFilter)
          .then(res => {
              this.perfis = JSON.parse(JSON.stringify(res.json())).list;
              this.paginas = this.getPaginas(res.json().total);
              console.log(res.json().total);
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
  
  openModal() {
      this.modalActions.emit({action:"modal",params:['open']});
  }
  
  filterTitulo() {
      this.perfilService.list(this.perfilFilter)
      .then(res => { 
          this.perfis = JSON.parse(JSON.stringify(res.json())).list;
       });
  }
  
  closeModal() {
      this.modalActions.emit({action:"modal",params:['close']});
  }
  
  goToPage(index: number) {
      console.log(this.paginas.length);
      if (index < 1 || index > this.paginas.length) {
          return;
      }
      this.perfilFilter.setPageNumber(index);
      this.perfilFilter.setPageSize(2);
      this.perfilService.list(this.perfilFilter)
      .then(res => {
          this.perfis = JSON.parse(JSON.stringify(res.json())).list;
          this.paginas = this.getPaginas(res.json().total);
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
      this.perfilService.delete(id)
          .then(res => {
              console.log(res.text());
              window.location.reload();
          })
          .catch(error => {
              console.log(error.text());
          })
      
  }
    
}