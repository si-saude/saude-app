/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadorRiscoAcidenteComponent } from './indicador-risco-acidente.component';

describe('IndicadorRiscoAcidenteComponent', () => {
  let component: IndicadorRiscoAcidenteComponent;
  let fixture: ComponentFixture<IndicadorRiscoAcidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorRiscoAcidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRiscoAcidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
