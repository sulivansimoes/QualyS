import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tela-consulta-padrao',
  templateUrl: './../view/tela-consulta-padrao.component.html',
  styleUrls: [
    './../view/tela-consulta-padrao.component.css'
  ]
})
export class TelaConsultaPadraoComponent implements OnInit {

  @Input() tabela:Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
