/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoCadastrarComponent } from './curso-cadastrar.component';

describe('CursoCadastrarComponent', () => {
  let component: CursoCadastrarComponent;
  let fixture: ComponentFixture<CursoCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
