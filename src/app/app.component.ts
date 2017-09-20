import { Component } from '@angular/core';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
<<<<<<< HEAD
//  private logo = require("./../assets/img/logo.jpg");
=======
//  private logoSansim = require("./../assets/img/logo_sansim.jpg");
  private showMenu = false;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
      this.authService.showMenuEvent.subscribe(
          mostrar => this.showMenu = mostrar);
  }
  
>>>>>>> branch 'master' of https://github.com/si-saude/saude-app.git
}
