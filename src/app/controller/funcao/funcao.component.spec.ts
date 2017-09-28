/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FuncaoComponent } from './funcao.component';

describe('FuncaoComponent', () => {
  let component: FuncaoComponent;
  let fixture: ComponentFixture<FuncaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
