import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { CidadeService } from './../cidade.service';
import { Cidade } from './../../../model/cidade';
import { GlobalVariable } from './../../../global';
import { GenericCidadeComponent } from './../../../generics/generic.cidade.component';

@Component({
  selector: 'app-cidade-editar',
  templateUrl: './../cidade-form/cidade-form.html',
  styleUrls: ['./../cidade-form/cidade-form.css']
})
export class CidadeEditarComponent extends GenericCidadeComponent implements OnInit {

  private titulo: string = "Editar Cidade";
  private corTitulo: string = GlobalVariable.COLOR_TITLE;
  private inscricao: Subscription;
  private cidade: Cidade;
//  private formulario: FormGroup;
//  private permissoesArray: FormArray;
//  private funcoes: Array<Object>;
//  private colorMsg: string;
//  private msg: string;
//  private verifyMsg: boolean = false;
  
    
  constructor(private route: ActivatedRoute,
          cidadeService: CidadeService,
          formBuilder: FormBuilder) { 
      super(cidadeService, formBuilder);
  }

  onChange($event){}
  ngOnInit() {
      
      this.formulario = this.formBuilder.group({
              nome: [null, Validators.required],
              uf: [null],
              id: [0],
              version: [0]
          } );
      
      this.inscricao = this.route.params.subscribe(
          (params: any) => {
            let id = params['id'];
            
            this.cidadeService.get(id)
                .then(res => {
                    this.cidade = res.json();
                    this.formulario = this.formBuilder.group({
                        nome: [this.cidade.nome, Validators.required],
                        uf: [this.cidade.uf],
                        id: [this.cidade.id],
                        version: [this.cidade.version]
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
