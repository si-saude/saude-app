/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndicadorRiscoSanitarioComponent } from './indicador-risco-sanitario.component';

describe('IndicadorRiscoSanitarioComponent', () => {
  let component: IndicadorRiscoSanitarioComponent;
  let fixture: ComponentFixture<IndicadorRiscoSanitarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorRiscoSanitarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorRiscoSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
