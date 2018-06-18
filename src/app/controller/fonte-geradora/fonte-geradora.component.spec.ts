/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FonteGeradoraComponent } from './fonte-geradora.component';

describe('FonteGeradoraComponent', () => {
  let component: FonteGeradoraComponent;
  let fixture: ComponentFixture<FonteGeradoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteGeradoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteGeradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
