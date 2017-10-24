/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GheeComponent } from './ghee.component';

describe('GheeComponent', () => {
  let component: GheeComponent;
  let fixture: ComponentFixture<GheeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GheeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GheeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
