import { Component } from '@angular/core';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from './usuario.service';
import { UsuarioFilter } from './usuario.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends GenericListComponent<Usuario, UsuarioFilter> {

  constructor(service: UsuarioService) {
      let usuarioFilter: UsuarioFilter = new UsuarioFilter();
      super(service, usuarioFilter);
  }
  
}