import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaErrosComponent } from '../componentes/tela-erros.component';

describe('TelaErrosComponent', () => {
  let component: TelaErrosComponent;
  let fixture: ComponentFixture<TelaErrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaErrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
