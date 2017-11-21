import { Component } from '@angular/core';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showMenu: boolean;
  
  constructor(private authService: AuthService) {
      this.showMenu = false;
  }
  
  ngOnInit() {
      this.authService.showMenu.subscribe(
          mostrar => this.showMenu = mostrar);
  }
  
}
