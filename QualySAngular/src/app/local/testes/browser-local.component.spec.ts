import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserLocalComponent } from '../componentes/browser-local.component';

describe('BrowserLocalComponent', () => {
  let component: BrowserLocalComponent;
  let fixture: ComponentFixture<BrowserLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
