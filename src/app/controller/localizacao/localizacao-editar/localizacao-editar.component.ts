import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoService } from './../localizacao.service';
import { GlobalVariable } from './../../../global';

@Component({
  selector: 'app-localizacao-editar',
  templateUrl: './../localizacao-form/localizacao-form.html',
  styleUrls: ['./../localizacao-form/localizacao-form.css']
})
export class LocalizacaoEditarComponent implements OnInit {

  private titulo: string = "Editar";
  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private inscricao: Subscription;
  private localizacao: Localizacao;
  private formulario: FormGroup;
//  private permissoesArray: FormArray;
//  private funcoes: Array<Object>;
  private colorMsg: string;
  private msg: string;
  private verifyMsg: boolean = false;
  
    
  constructor(private route: ActivatedRoute,
          private localizacaoService: LocalizacaoService,
          private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
      
      this.formulario = this.formBuilder.group({
          nome: [null, Validators.required],            
          id: [null],
          version: [null] 
      });
      
      this.inscricao = this.route.params.subscribe(
          (params: any) => {
            let id = params['id'];
            
            this.localizacaoService.get(id)
                .then(res => {
                    this.localizacao = res.json();
                    this.formulario = this.formBuilder.group({
                        nome: [this.localizacao.nome, Validators.required],            
                        id: [this.localizacao.id],
                        version: [this.localizacao.version]
                    });
                })
                .catch(error =>
                    console.log(error));
            });
  }
  
  isValid() {
      if ( this.formulario.valid ) { 
          return true;
      } else { return false; }    
  }
  
  save() {
      this.localizacaoService.submit(this.formulario.value)
      .then(res => {
          this.verifyMsg = true;
          this.colorMsg = "green";
          this.msg = res.text();
      })
      .catch(error => {
          this.verifyMsg = true;
          this.colorMsg = "red";
          this.msg = error.text();
      })
  }
    
  onDestroy() {
      this.inscricao.unsubscribe();
  }

}
