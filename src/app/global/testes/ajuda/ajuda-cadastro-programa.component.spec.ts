import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaCadastroProgramaComponent } from '../../componentes/ajuda/ajuda-cadastro-programa.component';

describe('AjudaCadastroProgramaComponent', () => {
  let component: AjudaCadastroProgramaComponent;
  let fixture: ComponentFixture<AjudaCadastroProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaCadastroProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaCadastroProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
