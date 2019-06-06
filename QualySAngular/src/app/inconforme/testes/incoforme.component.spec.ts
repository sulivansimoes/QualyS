import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InconformeComponent } from '../componentes/inconforme.component';

describe('IncoformeComponent', () => {
  let component: InconformeComponent;
  let fixture: ComponentFixture<InconformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InconformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InconformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
