import { Component, OnInit } from '@angular/core';
import { Inconforme } from 'src/app/inconforme/model/inconforme';

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
  private inconformes:Inconforme[] = [];

  private hoje:Date = new Date()
  // private teste = null;
  // private teste:Date;;

  constructor() { 
    // this.teste = this.hoje.getDate()+"/"+this.hoje.getUTCMonth()+1+"/"+this.hoje.getFullYear();
    // console.log(this.hoje);
  }

  ngOnInit() {  }

  private salvaRespostaFormulario(){
    alert("Salvou resposta formulário!");
  }

  private fechaTela(){
    alert("Fechou tela resposta formulário!")
  }

 
  /**
   * @description: Apresenta tela ( modal ) para usuário descrever inconformidade e o adiciona no array de inconformidade.
   */
  private geraInconforme():void{
    alert("Gera inconforme")
  }

  /**
   * @description: Verifica se item tem inconforme lançado, caso tenha faz a retirada do mesmo do array.
   */
  private retirarInconforme():void{

  }

  /**
   * @description:Checa se tem inconformidade no array de inconformes
   * @return {boolean} true caso houver inconforme no array, false caso contrário.
   */
  private checaExistenciaInconforme():boolean{
    return false;
  }
}
