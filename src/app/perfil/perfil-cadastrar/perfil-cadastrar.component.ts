import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PerfilService } from './../perfil.service';

@Component({
  selector: 'app-perfil-cadastrar',
  templateUrl: './../perfil-form/perfil-form.html',
  styleUrls: ['./../perfil-form/perfil-form.css']
})
export class PerfilCadastrarComponent implements OnInit {

    private titulo = "Adicionar Perfil";
    private formulario: FormGroup;  
    private permissoesArray: FormArray;  
    private funcoes: Array<Object>;
    private verifyMsg: boolean = false;
    private colorMsg: string = "green";
    private msg: string = '';
    
    private h = new Headers({'Content-Type': 'application/json'});
        
    private msgError: string = '';
    private verifyError: boolean = false;
      
    constructor(private http: Http, 
            private perfilService: PerfilService, 
            private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.formulario = this.formBuilder.group({
            titulo: [null, Validators.required],
            id: [0],
            version: [0],
            permissoes: this.formBuilder.array([
                this.formBuilder.group({
                    funcao: [''],
                    leitura: [false],
                    escrita: [false],
                    id: [0],
                    version: [0]
                }),
            ]), 
        });
        
         this.permissoesArray = this.formulario.get('permissoes') as FormArray;
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
    
    addPermission() {
        
        let permissao = new FormGroup({});
        permissao.addControl("funcao", new FormControl(''));
        permissao.addControl("leitura", new FormControl(false));
        permissao.addControl("escrita", new FormControl(false));
        permissao.addControl("id", new FormControl(0));
        permissao.addControl("version", new FormControl(0));
        
        this.permissoesArray.push(permissao);
    }
    
    removePermission(i: number) {
        this.permissoesArray.removeAt(i);
    }
    
    isValid() {
        if ( this.formulario.valid ) { 
            return true;
        } else { return false; }
        
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