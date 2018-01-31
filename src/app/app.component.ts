import { Component } from '@angular/core';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  show: boolean;
  
  constructor() {}
  
  onActivate(component) {
      if ( component.showNothing != undefined )
          this.show = component.showNothing;
  }
  
}
