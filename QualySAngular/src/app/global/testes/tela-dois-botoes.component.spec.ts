import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDoisBotoesComponent } from '../componentes/tela-dois-botoes.component';

describe('TelaDoisBotoesComponent', () => {
  let component: TelaDoisBotoesComponent;
  let fixture: ComponentFixture<TelaDoisBotoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaDoisBotoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaDoisBotoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
