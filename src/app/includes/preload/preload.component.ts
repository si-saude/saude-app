import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.css']
})
export class PreloadComponent implements OnInit {
  @Input() msg: string;
  @Input() show: boolean;
  modalPreload;
  modelParams;
  
  constructor() {
      this.modalPreload = new EventEmitter<string|MaterializeAction>();
      this.modelParams = [{
          dismissible: false,
          complete: function() { }
      }];
  }

  ngOnInit() {
      $(document).ready(function() {
          window.history.pushState(null, "", window.location.href);        
          window.onpopstate = function() {
              window.history.pushState(null, "", window.location.href);
          };
      });
  }
  
  ngOnChanges(changes: SimpleChanges) {
      if (changes["show"].currentValue === true)
          setTimeout(() => this.modalPreload.emit({action: "modal", params: ["open"]}), 1);
      else setTimeout(() => this.modalPreload.emit({action: "modal", params: ["close"]}), 1);
  }
  
  ngOnDestroy() {
      this.modalPreload.emit({action: "modal", params: ["close"]});
  }
  
}
