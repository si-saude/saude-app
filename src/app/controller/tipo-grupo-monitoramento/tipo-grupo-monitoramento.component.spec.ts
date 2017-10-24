/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipoGrupoMonitoramentoComponent } from './tipo-grupo-monitoramento.component';

describe('TipoGrupoMonitoramentoComponent', () => {
  let component: TipoGrupoMonitoramentoComponent;
  let fixture: ComponentFixture<TipoGrupoMonitoramentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGrupoMonitoramentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGrupoMonitoramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
