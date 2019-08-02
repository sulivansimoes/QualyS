import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaBoxComponent } from './tela-box.component';

describe('TelaBoxComponent', () => {
  let component: TelaBoxComponent;
  let fixture: ComponentFixture<TelaBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
