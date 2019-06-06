import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoesSalvarFecharComponent } from './../componentes/botoes-salvar-fechar.component';


describe('BotoesSalvarFecharComponent', () => {
  let component: BotoesSalvarFecharComponent;
  let fixture: ComponentFixture<BotoesSalvarFecharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoesSalvarFecharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoesSalvarFecharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
