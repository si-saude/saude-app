/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VacinaComponent } from './vacina.component';

describe('VacinaComponent', () => {
  let component: VacinaComponent;
  let fixture: ComponentFixture<VacinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
