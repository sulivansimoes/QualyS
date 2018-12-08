import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resposta-formulario',
  templateUrl: './../view/resposta-formulario.component.html',
  styleUrls: [
    './../view/resposta-formulario.component.css',
    './../../global/view/estilo-global-crud.css'
  ]
})
export class RespostaFormularioComponent implements OnInit {

  private nomeFormulario:String = "PAC-1 \\ Vistoria Manutenção" //VAI VIR DO BANCO DE DADOS.
// private respostas
// private inconformes

  constructor() { }

  ngOnInit() {  }

  private salvaRespostaFormulario(){
    alert("Salvou resposta formulário!");
  }

  private fechaTela(){
    alert("Fechou tela resposta formulário!")
  }

}
