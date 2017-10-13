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
      super(cidadeService);
  }

  ngOnInit() {
      
      this.cidade = new Cidade();
  
      this.cidade.setNome(null);
      this.cidade.setUf(null);
      this.cidade.setId(0);
      this.cidade.setVersion(0);
      
//      this.formulario = this.formBuilder.group(this.cidade);
//      
//      this.inscricao = this.route.params.subscribe(
//          (params: any) => {
//            let id = params['id'];
//            
//            this.cidadeService.get(id)
//                .then(res => {
//                    this.cidade = res.json();
//                    this.formulario = this.formBuilder.group(this.cidade);
//                })
//                .catch(error =>
//                    console.log(error));
//          
//          });
  }
    
  onDestroy() {
//      this.inscricao.unsubscribe();
  }

}
