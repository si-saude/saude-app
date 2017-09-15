import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from './../../global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private theme: string = GlobalVariable.THEME_API;
    
  constructor() { }

  ngOnInit() { }


}
