import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoformeComponent } from '../componentes/incoforme.component';

describe('IncoformeComponent', () => {
  let component: IncoformeComponent;
  let fixture: ComponentFixture<IncoformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncoformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncoformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
