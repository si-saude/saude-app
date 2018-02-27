/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntervencaoComponent } from './intervencao.component';

describe('IntervencaoComponent', () => {
  let component: IntervencaoComponent;
  let fixture: ComponentFixture<IntervencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
