import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConsultaPadraoComponent } from '../componentes/tela-consulta-padrao.component';

describe('TelaConsultaPadraoComponent', () => {
  let component: TelaConsultaPadraoComponent;
  let fixture: ComponentFixture<TelaConsultaPadraoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaConsultaPadraoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaConsultaPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
