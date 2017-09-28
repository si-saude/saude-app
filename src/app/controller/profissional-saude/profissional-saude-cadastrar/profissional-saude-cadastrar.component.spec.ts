/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfissionalSaudeCadastrarComponent } from './profissional-saude-cadastrar.component';

describe('ProfissionalSaudeCadastrarComponent', () => {
  let component: ProfissionalSaudeCadastrarComponent;
  let fixture: ComponentFixture<ProfissionalSaudeCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalSaudeCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalSaudeCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
