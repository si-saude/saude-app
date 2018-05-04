import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { UsuarioService } from './../usuario/usuario.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';

@Injectable()
export class NotificacaoService extends GenericService{

  constructor( http: Http,  router: Router,
          private usuarioService: UsuarioService,
          private profissionalService: ProfissionalSaudeService ) {
      super(http, router, "notificacao");
  }
  
  getUsuario( id: number ) {
      return this.usuarioService.get( id );
  }
  
  getProfissional( profissionalFilter ) {
      return this.profissionalService.list( profissionalFilter );
  }

}