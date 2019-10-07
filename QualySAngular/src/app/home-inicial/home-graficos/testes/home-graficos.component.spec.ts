import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGraficosComponent } from './../componentes/home-graficos.component';

describe('HomeGraficosComponent', () => {
  let component: HomeGraficosComponent;
  let fixture: ComponentFixture<HomeGraficosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGraficosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
