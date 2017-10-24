/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CriterioComponent } from './criterio.component';

describe('CriterioComponent', () => {
  let component: CriterioComponent;
  let fixture: ComponentFixture<CriterioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
