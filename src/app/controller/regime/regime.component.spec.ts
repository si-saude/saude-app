/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegimeComponent } from './regime.component';

describe('RegimeComponent', () => {
  let component: RegimeComponent;
  let fixture: ComponentFixture<RegimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
