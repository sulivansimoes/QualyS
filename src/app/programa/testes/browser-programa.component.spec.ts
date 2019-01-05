import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserProgramaComponent } from '../componentes/browser-programa.component';

describe('BrowserProgramaComponent', () => {
  let component: BrowserProgramaComponent;
  let fixture: ComponentFixture<BrowserProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
