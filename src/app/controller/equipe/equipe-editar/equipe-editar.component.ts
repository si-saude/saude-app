import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms'; 

import { Subscription } from 'rxjs/Rx'; 

import { Equipe } from './../../../model/equipe';
import { EquipeService } from './../equipe.service';
import { GlobalVariable } from './../../../global';

@Component({
  selector: 'app-equipe-editar',
  templateUrl: './../equipe-form/equipe-form.html',
  styleUrls: ['./../equipe-form/equipe-form.css']
})
export class EquipeEditarComponent implements OnInit {

  private titulo: string = "Editar";
  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private inscricao: Subscription;
  private equipe: Equipe;
  private formulario: FormGroup;
//  private permissoesArray: FormArray;
//  private funcoes: Array<Object>;
  private colorMsg: string;
  private msg: string;
  private verifyMsg: boolean = false;
  
    
  constructor(private route: ActivatedRoute,
          private equipeService: EquipeService,
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
            
            this.equipeService.get(id)
                .then(res => {
//                    this.equipe = res.json();
//                    this.formulario = this.formBuilder.group({
//                        nome: [this.equipe.nome, Validators.required],            
//                        id: [this.equipe.id],
//                        version: [this.equipe.version]
//                    });
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
//      this.equipeService.submit(this.formulario.value)
//      .then(res => {
//          this.verifyMsg = true;
//          this.colorMsg = "green";
//          this.msg = res.text();
//      })
//      .catch(error => {
//          this.verifyMsg = true;
//          this.colorMsg = "red";
//          this.msg = error.text();
//      })
  }
    
  onDestroy() {
      this.inscricao.unsubscribe();
  }

}
