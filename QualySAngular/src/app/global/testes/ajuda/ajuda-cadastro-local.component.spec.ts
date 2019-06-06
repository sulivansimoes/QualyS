import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaCadastroLocalComponent } from '../../componentes/ajuda/ajuda-cadastro-local.component';

describe('AjudaCadastroLocalComponent', () => {
  let component: AjudaCadastroLocalComponent;
  let fixture: ComponentFixture<AjudaCadastroLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaCadastroLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaCadastroLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
