/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadorRiscoErgonomicoComponent } from './indicador-risco-ergonomico.component';

describe('IndicadorRiscoErgonomicoComponent', () => {
  let component: IndicadorRiscoErgonomicoComponent;
  let fixture: ComponentFixture<IndicadorRiscoErgonomicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorRiscoErgonomicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRiscoErgonomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
