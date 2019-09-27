import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-cadastro-usuario',
  templateUrl: './../../view/ajuda/ajuda-cadastro-usuario.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-cadastro-usuario.component.css'
  ]
})
export class AjudaCadastroUsuarioComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaCadastroUsuario";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "Usuário";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = []

  constructor() {

    this.textoDefinicao += "Nesta rotina são cadastrados todos os usuário que tem acesso ao sistema." 

    this.campos.push(["CPF"       , "Número do cpf do usuário (Preencha somente com os números do CPF, sem os pontos)"]);
    this.campos.push(["Nome"      , "Nome completo do usuário do sistema"]);
    this.campos.push(["Senha"     , "Senha que usuário fará login no sistema."]);
    this.campos.push(["E-mail"    , "Informe o e-mail do usuário."]);
    this.campos.push(["Perfil"    , "Informe o perfil de acesso ao sistema do Usuário"]);
    this.campos.push(["Bloqueado" , "Informe se o usuário se encontra bloqueado ( Ativo ) ou não no sistema."]);
    this.campos.push(["Assinatura", "Informe uma imagem contendo a assinatura do usuário. [Este campo é obrigatório apenas na inclusão do usuário]"]);

  }

  ngOnInit() { }

}
