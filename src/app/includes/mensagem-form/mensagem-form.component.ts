import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem-form',
  templateUrl: './mensagem-form.component.html',
  styleUrls: ['./mensagem-form.component.css']
})
export class MensagemFormComponent implements OnInit {
    
  @Input() msg: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
