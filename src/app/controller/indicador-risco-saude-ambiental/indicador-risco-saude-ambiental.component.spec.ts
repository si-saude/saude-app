/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadorRiscoSaudeAmbientalComponent } from './indicador-risco-saude-ambiental.component';

describe('IndicadorRiscoSaudeAmbientalComponent', () => {
  let component: IndicadorRiscoSaudeAmbientalComponent;
  let fixture: ComponentFixture<IndicadorRiscoSaudeAmbientalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorRiscoSaudeAmbientalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRiscoSaudeAmbientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
