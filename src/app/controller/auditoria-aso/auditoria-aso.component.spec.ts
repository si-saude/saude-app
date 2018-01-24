/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuditoriaAsoComponent } from './auditoria-aso.component';

describe('AuditoriaAsoComponent', () => {
  let component: AuditoriaAsoComponent;
  let fixture: ComponentFixture<AuditoriaAsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaAsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaAsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
