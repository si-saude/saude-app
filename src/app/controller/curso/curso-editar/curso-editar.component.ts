import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { CursoService } from './../curso.service';
import { Curso } from './../../../model/curso';
import { GlobalVariable } from './../../../global';
import { GenericCursoComponent } from './../../../generics/generic.curso.component';

@Component({
  selector: 'app-curso-editar',
  templateUrl: './../curso-form/curso-form.html',
  styleUrls: ['./../curso-form/curso-form.css']
})
export class CursoEditarComponent extends GenericCursoComponent implements OnInit {

  private titulo: string = "Editar";
  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private inscricao: Subscription;
  private curso: Curso;
//  private formulario: FormGroup;
//  private permissoesArray: FormArray;
//  private funcoes: Array<Object>;
//  private colorMsg: string;
//  private msg: string;
//  private verifyMsg: boolean = false;
  
    
  constructor(private route: ActivatedRoute,
          cursoService: CursoService,
          formBuilder: FormBuilder) { 
      super(cursoService, formBuilder);
  }

  onChange($event){}
  ngOnInit() {
      
      this.formulario = this.formBuilder.group({
              nome: [null, Validators.required],
              descricao: [null],
              validade: [0],
              id: [0],
              version: [0]
          } );
      
      this.inscricao = this.route.params.subscribe(
          (params: any) => {
            let id = params['id'];
            
            this.cursoService.get(id)
                .then(res => {
                    this.curso = res.json();
                    this.formulario = this.formBuilder.group({
                        nome: [this.curso.nome, Validators.required],
                        descricao: [this.curso.descricao],
                        validade: [this.curso.validade],
                        id: [this.curso.id],
                        version: [this.curso.version]
                    } );
                })
                .catch(error =>
                    console.log(error));
          
          });
  }
  
  isValid():boolean {
      return super.isValid();
  }
  
  save() {
      super.save();
  }
  
  onDestroy() {
      this.inscricao.unsubscribe();
  }

}
