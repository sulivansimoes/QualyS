import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaMenuPrincipalComponent } from '../../componentes/ajuda/ajuda-menu-principal.component';

describe('AjudaMenuPrincipalComponent', () => {
  let component: AjudaMenuPrincipalComponent;
  let fixture: ComponentFixture<AjudaMenuPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaMenuPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaMenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
