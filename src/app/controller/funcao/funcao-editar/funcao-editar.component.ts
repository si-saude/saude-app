import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { FuncaoService } from './../funcao.service';
import { Funcao } from './../../../model/funcao';
import { Curso } from './../../../model/curso';
import { GlobalVariable } from './../../../global';
import { GenericFuncaoComponent } from './../../../generics/generic.funcao.component';

@Component({
  selector: 'app-funcao-editar',
  templateUrl: './../funcao-form/funcao-form.html',
  styleUrls: ['./../funcao-form/funcao-form.css']
})
export class FuncaoEditarComponent extends GenericFuncaoComponent implements OnInit {

  private titulo: string = "Editar";
  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private inscricao: Subscription;
  private funcao: Funcao;
//  private formulario: FormGroup;
//  private permissoesArray: FormArray;
//  private funcoes: Array<Object>;
//  private colorMsg: string;
//  private msg: string;
//  private verifyMsg: boolean = false;
  
    
  constructor(private route: ActivatedRoute,
          funcaoService: FuncaoService,
          formBuilder: FormBuilder) { 
      super(funcaoService, formBuilder);
  }

  onChange($event){}
  ngOnInit() {
      
      this.formulario = this.formBuilder.group({
              nome: [null, Validators.required],
              id: [0],
              version: [0],
              cursos: this.formBuilder.array([
                  this.formBuilder.group({
                      curso: [null, Validators.required],
                      id: [0],
                      version: [0]
                  }),
              ]),
          } );
      
      this.cursosArray = this.formulario.get('cursos') as FormArray;
      
      this.inscricao = this.route.params.subscribe(
          (params: any) => {
            let id = params['id'];
            
            this.funcaoService.get(id)
                .then(res => {
                    this.funcao = res.json();
                    this.formulario = this.formBuilder.group({
                        nome: [null, Validators.required],
                        id: [0],
                        version: [0],
                        cursos: this.formBuilder.array([
                            this.formBuilder.group({
                                curso: [null, Validators.required],
                                id: [0],
                                version: [0]
                            }),
                        ]),
                    } );
                
                this.cursosArray = this.formulario.get('cursos') as FormArray;
                this.cursosArray.removeAt(0);
                
                for (var index = 0; index < this.funcao.cursos.length; index++) {
                    this.includeCurso(this.funcao.cursos[index]);
                }
                
            })
            .catch(error =>
                console.log(error));
          
          }
      );
  }
  
  addCurso() {
      super.addCurso();
  }
  
  removeCurso(i: number) {
      super.removeCurso(i);
  }
  
  isValid():boolean {
      return super.isValid();
  }
  
  save() {
      super.save();
  }
  
  changedExtraHandler(evento: string) {
      super.changedExtraHandler(evento);
  }
  
//  addPermission() {
//      
//      let permissao = new FormGroup({});
//      permissao.addControl("funcao", new FormControl(''));
//      permissao.addControl("leitura", new FormControl(false));
//      permissao.addControl("escrita", new FormControl(false));
//      permissao.addControl("funcao", new FormControl(null));
//      permissao.addControl("id", new FormControl(0));
//      permissao.addControl("version", new FormControl(0));
//      
//      this.permissoesArray.push(permissao);
//  }
//
//  removePermission(i: number) {
//      this.permissoesArray.removeAt(i);
//  }
//  
//  isValid() {
//      if ( this.formulario.valid ) { 
//          return true;
//      } else { return false; }
//      
//  }
//  
//  save() {
//      this.funcaoService.submit(this.formulario.value)
//          .then(res => { 
//              this.verifyMsg = true;
//              this.colorMsg = "green";
//              this.msg = res.text();
//          })
//          .catch(error => {
//              this.verifyMsg = true;
//              this.colorMsg = "red";
//              this.msg = error.text();
//          });
//  }
//  
//  changedExtraHandler(evento: string) {
//      if ( evento != undefined ) {
//          if ( evento.length > 3 ) {
//              
//            this.funcaoService.getFuncoes(evento).
//            then(res => 
//                this.funcoes = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]'));  
//          }
//      }
//  }
  
  includeCurso(curso: Curso) {
      let cursoForm = new FormGroup({});
      cursoForm.addControl("nome", new FormControl(curso.nome));
      cursoForm.addControl("id", new FormControl(curso.id));
      cursoForm.addControl("version", new FormControl(curso.version));
      this.cursosArray.push(cursoForm);
  }
  
  onDestroy() {
      this.inscricao.unsubscribe();
  }

}
