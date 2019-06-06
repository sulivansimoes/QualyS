import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserFrequenciaComponent } from '../componentes/browser-frequencia.component';

describe('BrowserFrequenciaComponent', () => {
  let component: BrowserFrequenciaComponent;
  let fixture: ComponentFixture<BrowserFrequenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserFrequenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
