import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserInconformeComponent } from './../componentes/browser-inconforme.component';

describe('BrowserInconformeComponent', () => {
  let component: BrowserInconformeComponent;
  let fixture: ComponentFixture<BrowserInconformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserInconformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserInconformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
