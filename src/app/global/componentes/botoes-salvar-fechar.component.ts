import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botoes-salvar-fechar',
  templateUrl: './../view/botoes-salvar-fechar.component.html',
  styleUrls: [
    './../view/botoes-salvar-fechar.component.css',
    './../view/estilo-global-crud.css'
  ]
})
export class BotoesSalvarFecharComponent implements OnInit {
                                
                                  //Escuta clique do botão.  
    @Output() botaoSalvarClicado: EventEmitter<any> = new EventEmitter();
    @Output() botaoFecharClicado: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }
}
