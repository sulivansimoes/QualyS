import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAjudaComponent } from '../../componentes/ajuda/tela-ajuda.component';

describe('TelaAjudaComponent', () => {
  let component: TelaAjudaComponent;
  let fixture: ComponentFixture<TelaAjudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
