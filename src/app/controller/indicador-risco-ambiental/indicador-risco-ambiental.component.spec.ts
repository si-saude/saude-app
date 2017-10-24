/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadorRiscoAmbientalComponent } from './indicador-risco-ambiental.component';

describe('IndicadorRiscoAmbientalComponent', () => {
  let component: IndicadorRiscoAmbientalComponent;
  let fixture: ComponentFixture<IndicadorRiscoAmbientalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorRiscoAmbientalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRiscoAmbientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
