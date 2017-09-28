/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfissionalSaudeEditarComponent } from './profissional-saude-editar.component';

describe('ProfissionalSaudeEditarComponent', () => {
  let component: ProfissionalSaudeEditarComponent;
  let fixture: ComponentFixture<ProfissionalSaudeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalSaudeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalSaudeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
