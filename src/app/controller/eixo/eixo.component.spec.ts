/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EixoComponent } from './eixo.component';

describe('EixoComponent', () => {
  let component: EixoComponent;
  let fixture: ComponentFixture<EixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
