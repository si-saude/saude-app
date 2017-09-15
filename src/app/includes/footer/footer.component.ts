import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from './../../global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    
  private theme: string = GlobalVariable.THEME_API;

  constructor() { }

  ngOnInit() {
  }

}
