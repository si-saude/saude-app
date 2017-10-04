import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { PerfilService } from '../controller/perfil/perfil.service';

export abstract class GenericPerfilComponent {  

  formulario: FormGroup;
  permissoesArray: FormArray;  
  colorMsg: string;
  msg: string;
  verifyMsg: boolean = false;
  perfilService: PerfilService;
  formBuilder: FormBuilder;
  funcionalidades: Array<string>;
    
  constructor(perfilService: PerfilService,
      formBuilder: FormBuilder) { 
      this.perfilService = perfilService;
      this.formBuilder = formBuilder;
      
      this.perfilService.getFuncionalidades("")
          .then(res => {
//              this.funcionalidades = res.json();
              console.log(res.json());
          });
  }
  
  addPermission() {
      let permissao = new FormGroup({});
      permissao.addControl("funcionalidade", new FormControl(''));
      permissao.addControl("leitura", new FormControl(false));
      permissao.addControl("escrita", new FormControl(false));
      permissao.addControl("perfil", new FormControl(null));
      permissao.addControl("id", new FormControl(0));
      permissao.addControl("version", new FormControl(0));
      
      this.permissoesArray.push(permissao);
  }

  removePermission(i: number) {
      this.permissoesArray.removeAt(i);
  }
  
  isValid(): boolean {
      if ( this.formulario.valid ) { 
          return true;
      } else { return false; }
  }
  
  save() {
      this.perfilService.submit(this.formulario.value)
          .then(res => {
              console.log('cadastrandooo');
              this.verifyMsg = true;
              this.colorMsg = "green";
              this.msg = res.text();
          })
          .catch(error => {
              this.verifyMsg = true;
              this.colorMsg = "red";
              this.msg = error.text();
          });
  }
  
  changedExtraHandler(evento: string) {
      if ( evento != undefined ) {
          if ( evento.length > 3 ) {
              
            this.perfilService.getFuncionalidades(evento).
            then(res => {
                console.log(res.json());
//                this.funcoes = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]')
            });
              
              
//              this.funcoesFiltered = this.funcoes.filter(f => f.toString().indexOf(evento, 0) > -1);
              
//              for (var index = 0; index < this.funcoes.length; index++) {
//                  console.log( this.funcoes[index] );
//              }
              
//              console.log(this.funcoes.filter(f => f.toString().indexOf(evento) !== -1));
          }
      }
  }
  
}  