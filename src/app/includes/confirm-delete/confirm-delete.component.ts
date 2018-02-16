import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() service;
  @Input() show: boolean;
  @Input() idDelete: number;
  modalDelete;
  modelParams;
  
  constructor(private router: Router) {
      this.modalDelete = new EventEmitter<string|MaterializeAction>();
      this.modelParams = [{
          dismissible: false,
          complete: function() { }
      }];
  }

  ngOnInit() { }
  
  ngOnChanges(changes: SimpleChanges) {
      if (changes["show"].currentValue === true)
          setTimeout(() => this.modalDelete.emit({action: "modal", params: ["open"]}), 1);
  }
  
  
  confirmDelete() {
      this.service.delete( this.idDelete )
          .then( res => {
              window.location.reload();
          } )
          .catch( error => {
              console.log(error);
          } )
  }
  
  closeModalDelete() {
      this.modalDelete.emit({action: "modal", params: ["close"]});
  }
  
  
  onDestroy() {
      this.modalDelete.emit({action: "modal", params: ["close"]});
  }
  
}
