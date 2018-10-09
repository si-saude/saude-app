import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

@Component({
  selector: 'app-confirm-save',
  templateUrl: './confirm-save.component.html',
  styleUrls: ['./confirm-save.component.css']
})
export class ConfirmSaveComponent implements OnInit {
  @Input() goTo: string;  
  @Input() msg: string;
  @Input() show: boolean;
  @Input() reload: boolean;
  modalConfirmSave;
  modelParams;
  
  constructor(private router: Router) {
      this.modalConfirmSave = new EventEmitter<string|MaterializeAction>();
      this.modelParams = [{
          dismissible: false,
          complete: function() { }
      }];
  }

  ngOnInit() { }
  
  ngOnChanges(changes: SimpleChanges) {
      if (changes["show"].currentValue === true)
          setTimeout(() => this.modalConfirmSave.emit({action: "modal", params: ["open"]}), 1);
      else setTimeout(() => this.modalConfirmSave.emit({action: "modal", params: ["close"]}), 1);
  }
  
  onDestroy() {
      this.modalConfirmSave.emit({action: "modal", params: ["close"]});
  }
  
  confirmSave() {
      
      if ( this.reload ) {
          window.location.reload();
          return;
      }      
      this.modalConfirmSave.emit({action: "modal", params: ["close"]});      
      if ( this.goTo == "$*close*$") {
          window.close();         
      }     
      else this.router.navigate(['/'+this.goTo]);
  }
  
  setGoTo( goTo: string){      
      this.goTo = goTo;
  }
  
}
