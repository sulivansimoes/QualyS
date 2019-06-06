import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserUsuarioComponent } from '../componentes/browser-usuario.component';

describe('BrowserUsuarioComponent', () => {
  let component: BrowserUsuarioComponent;
  let fixture: ComponentFixture<BrowserUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
