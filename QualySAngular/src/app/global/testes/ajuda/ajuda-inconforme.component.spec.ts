import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaInconformeComponent } from '../../componentes/ajuda/ajuda-inconforme.component';

describe('AjudaInconformeComponent', () => {
  let component: AjudaInconformeComponent;
  let fixture: ComponentFixture<AjudaInconformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaInconformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaInconformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
