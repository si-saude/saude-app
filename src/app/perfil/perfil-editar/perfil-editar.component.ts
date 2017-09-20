import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { PerfilService } from './../perfil.service';
import { Perfil } from './../../model/perfil';
import { Permissao } from './../../model/permissao';
import { MensagemFormComponent } from './../../includes/mensagem-form/mensagem-form.component';

@Component({
  selector: 'app-perfil-editar',
  templateUrl: './../perfil-form/perfil-form.html',
  styleUrls: ['./../perfil-form/perfil-form.css']
})
export class PerfilEditarComponent implements OnInit {

  private inscricao: Subscription;
  private perfil: Perfil;
  private formulario: FormGroup;
  private permissoesArray: FormArray;
  private funcoes: Array<Object>;
  private colorMsg: string;
  private msg: string;
  private verifyMsg: boolean = false;
    
  constructor(private route: ActivatedRoute,
          private perfilService: PerfilService,
          private formBuilder: FormBuilder) { }

  ngOnInit() {
      
      this.formulario = this.formBuilder.group({
          titulo: [null, Validators.required],            
          id: [null],
          version: [null],
          permissoes: this.formBuilder.array([
              this.formBuilder.group({
                  id: [null],
                  version: [null],
                  funcao: [''],
                  leitura: [false],
                  escrita: [false],
                  perfil: [null]
              }),
          ]), 
      });
      
      this.permissoesArray = this.formulario.get('permissoes') as FormArray;
      
      this.inscricao = this.route.params.subscribe(
          (params: any) => {
            let id = params['id'];
            
            this.perfilService.get(id)
            .then(res => {
                this.perfil = res.json();
                this.formulario = this.formBuilder.group({
                    titulo: [this.perfil.titulo, Validators.required],            
                    id: [this.perfil.id],
                    version: [this.perfil.version],
                    permissoes: this.formBuilder.array([
                                    this.formBuilder.group({
                                        id: [0],
                                        version: [0],
                                        funcao: [''],
                                        leitura: [false],
                                        escrita: [false],
                                        perfil: [null]
                                    }),
                                ])
                });
                
                this.permissoesArray = this.formulario.get('permissoes') as FormArray;
                this.permissoesArray.removeAt(0);
                
                for (var index = 0; index < this.perfil.permissoes.length; index++) {
                    this.includePermission(this.perfil.permissoes[index]);
                }
                
            })
            .catch(error =>
                console.log(error));
          
          }
      );
  }
  
  addPermission() {
      
      let permissao = new FormGroup({});
      permissao.addControl("funcao", new FormControl(''));
      permissao.addControl("leitura", new FormControl(false));
      permissao.addControl("escrita", new FormControl(false));
      permissao.addControl("perfil", new FormControl(null));
      permissao.addControl("id", new FormControl(0));
      permissao.addControl("version", new FormControl(0));
      
      this.permissoesArray.push(permissao);
  }
  
  includePermission(permissao:Permissao) {
      let permissaoForm = new FormGroup({});
      permissaoForm.addControl("funcao", new FormControl(permissao.funcao));
      permissaoForm.addControl("leitura", new FormControl(permissao.leitura));
      permissaoForm.addControl("escrita", new FormControl(permissao.escrita));
      permissaoForm.addControl("perfil", new FormControl(permissao.perfil));
      permissaoForm.addControl("id", new FormControl(permissao.id));
      permissaoForm.addControl("version", new FormControl(permissao.version));
      this.permissoesArray.push(permissaoForm);
  }
  
  isValid() {
      if ( this.formulario.valid ) { 
          return true;
      } else { return false; }
      
  }
  
  save() {
      console.log(this.formulario.value);
      this.perfilService.submit(this.formulario.value)
          .then(res => { 
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
  
  onDestroy() {
      this.inscricao.unsubscribe();
  }
  
  removePermission(i: number) {
      this.permissoesArray.removeAt(i);
  }
  
  changedExtraHandler(evento: string) {
      
      if ( evento != undefined ) 
          if ( evento.length > 3 ) {
              
            this.perfilService.getFuncoes(evento).
            then(res => 
                this.funcoes = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]'));  
          }
  }

}
