import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.css']
})
export class PreloadComponent implements OnInit {
    
  @Input() msg: string;

  constructor() { }

  ngOnInit() {
  }

}
