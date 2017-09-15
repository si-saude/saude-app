import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContatoService } from './contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private contatoService: ContatoService, private formBuilder: FormBuilder) { }
  
  private formulario: FormGroup;
  private enviadoComSucesso: boolean = false;
  
  ngOnInit() {
      this.formulario = this.formBuilder.group({
         nome: [null, Validators.required],
         email: [null, [Validators.required, 
                        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
         mensagem: [null, Validators.required] 
      });
  }
  
  sendMessage(){
      if (this.formulario.valid) {
          this.contatoService.sendMessage(this.formulario.value);
          this.enviadoComSucesso = true;
      } else {
          this.verifyValidForm();
          this.enviadoComSucesso = false;
      }
  }
  
  verifyValidForm() {
      if (this.formulario.invalid && 
              this.formulario.get('nome').touched &&
              this.formulario.get('email').touched &&
              this.formulario.get('mensagem').touched) {
          return true;
      } else {
          return false;
      }
  }
  
}
