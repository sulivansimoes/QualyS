import { Component, OnInit, Output, EventEmitter } from '@angular/core';


/**
 * @description Componente fornece uma tela padrão com dois botões "Salvar" e "Cancelar"
 * @output {EventEmitter<any>} ( botaoSalvarClicado ) - Recebe um evento (Função) que será acionado quando clicar no botão Salvar.
 * @output {EventEmitter<any>} ( botaoFecharClicado ) - Recebe um evento (Função) que será acionado quando clicar no botão Salvar.  
 */
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
