import { Component } from '@angular/core';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from './usuario.service';
import { UsuarioFilter } from './usuario.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { UsuarioGuard } from './../../guards/guards-child/usuario.guard';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css', '../../../assets/css/list-component.css']
})
export class UsuarioComponent extends GenericListComponent<Usuario, UsuarioFilter, UsuarioGuard> {

  constructor(service: UsuarioService, usuarioGuard: UsuarioGuard) {
      super(service, new UsuarioFilter(), usuarioGuard);
  }
  
}