import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resposta-formulario',
  templateUrl: './../view/resposta-formulario.component.html',
  styleUrls: [
    './../view/resposta-formulario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class RespostaFormularioComponent implements OnInit {

  private nomeFormulario:String = "PAC-1 \\ Vistoria Manutenção" //VAI VIR DO BANCO DE DADOS.
// private respostas
// private inconformes

  private hoje:Date = new Date()
  private teste = null;

  constructor() { 
    this.teste = this.hoje.getDate()+"/"+this.hoje.getUTCMonth()+1+"/"+this.hoje.getFullYear();
    console.log(this.hoje);
  }

  ngOnInit() {  }

  private salvaRespostaFormulario(){
    alert("Salvou resposta formulário!");
  }

  private fechaTela(){
    alert("Fechou tela resposta formulário!")
  }

}
