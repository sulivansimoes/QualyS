// COMPONTENTES PADRÕES
import { Component, OnInit     } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription          } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Usuario                 }  from './../model/usuario';
import { UsuarioService          } from './../model/usuario.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';
import { msgConfirmaCancelamento } from 'src/app/global/funcoes/mensagensPadroes';
// COMPONENTES DE TERCEIROS
import * as fileUpload from 'fuctbase64';
import * as validarCpf from 'validar-cpf';

@Component({
  selector: 'app-usuario',
  templateUrl: './../view/usuario.component.html',
  styleUrls: [
    './../view/usuario.component.css',
    './../../global/view/estilo-global-crud.css',
  ]
})
export class UsuarioComponent implements OnInit {

   //TAMANHO MAXIMO DE CAMPOS
  private SIZE_CPF    = 11;
  private SIZE_NOME   = 50;
  private SIZE_EMAIL  = 60;
  private SIZE_SENHA  = 18;

  private inscricao          = new Subscription;
  private usuario:Usuario    = new Usuario();
  private camposObrigatorios = false;
  private mensagemAviso      = null;
  private errosApi           = null;
  private confirmaSenha:string;
  private edita             = false;   // Variavel serve de flag pra ver se está iditando ou incluindo novo cadastro.
  private senhaNoModoEditar = "******************";
  private imagemAssinatura:any = null;
  // Variaveis usadas no modal de cancelamento
  private mensagemCancelamento    = msgConfirmaCancelamento;
  private cancela                 = false; 
  private idModal                 = "idCancelaUsuario"

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router:Router,
              private usuarioService:UsuarioService,
              private route: ActivatedRoute
             ) { 
  }

  ngOnInit() {

      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {

          this.usuario.cpf       = queryParams['cpf'      ];
          this.usuario.nome      = queryParams['nome'     ];
          this.usuario.email     = queryParams['email'    ];
          this.usuario.bloqueado = queryParams['bloqueado'];

          this.edita = this.usuario.cpf ? true : false;

          //Caso esteja editando eu preencho com asteriscos só pra não ficar vazio.
          if(this.edita){
            this.usuario.senha = this.senhaNoModoEditar;
            this.confirmaSenha = this.senhaNoModoEditar;
          }
        }
      );    
  }


  /**
   * Destruo a inscrição ao finalizar
   */
  ngOnDestroy(){

    this.inscricao.unsubscribe();
  }  

  
  /**
   * @description Pega imagem que foi selecionada no campo encriptada em base64 e guarda.
   * @param event imagem da assinatura.
   */
  private fileSelected(event:any){

    let result = fileUpload(event);
    this.imagemAssinatura = result;
  }


  /**
   * @description Função valida se informações do formulário estão corretas. Vê se o que está sendo feito
   *              é atualização ou salvamento de um novo registro e chama a função responsável pela ação.
   */
  private salva(){

    let  imagemAssinatura:FormData;
    
    //-----------------------------------------------------
    // Validando campos vazios 
    //-----------------------------------------------------
    if( this.isEmpty() ){

      this.camposObrigatorios = true;
      this.setMensagemAviso(msgCamposNaoPreenchidos);
      return;

    }else{

      this.camposObrigatorios = false;
    }

    if(  ! validarCpf( this.usuario.cpf ) ){
      this.setMensagemAviso("CPF inválido");
      return;
    }

    //-----------------------------------------------------
    // Validando senha 
    //-----------------------------------------------------
    if(this.usuario.senha != this.confirmaSenha){

      this.setMensagemAviso("As senhas não coincidem! Preencha os campos de senha corretamente.")
      return;
    }

    //-----------------------------------------------------
    // Adicionando arquivo de imagem no objeto de Usuário 
    //----------------------------------------------------- 
    this.usuario.setAssinatura(this.imagemAssinatura.__zone_symbol__value.base64);
    console.log(this.usuario.assinatura);

    if(this.edita){

      //Faço uma verificação rápida para ver se alterou a senha ou não.
      //Caso não editou mudo pra null antes de mandar atualizar 
      if(this.usuario.senha == this.senhaNoModoEditar){
        this.usuario.senha = null;
      }

      this.atualizaUsuario();
    }else{
      
      this.salvaUsuario();
    }
  } 


  /**
   * @description: Envia solicitação para o service salvar usuário
   */
  private salvaUsuario(){

    this.usuarioService.salvaUsuario(this.usuario)
                       .subscribe( 
                                    result =>{ 
                                                alert("deu certo salvamento");
                                                this.usuario = new Usuario();
                                                this.senhaNoModoEditar = "";
                                              },
                                    erros => { 
                                                this.setErrosApi(erros);
                                             }
                                  );  
  } 


  /**
   * @description Se inscreve no serviço que envia solicitação para API atualizar usuario na base de dados.
   */
  private atualizaUsuario(){
  
    this.usuarioService.atualizaUsuario(this.usuario)
                       .subscribe( 
                                    result =>{ 
                                                alert("deu certo atualização");
                                             },
                                    erros => { 
                                                this.setErrosApi(erros);
                                              }
                                  );
  // this.fechaTela();
  }


  /**
   * @description: Aciona modal para confirmar cancelamento
   * */
  private botaoCancelaClicado(){
    this.cancela = !this.cancela;
  }


  /**
   * @description: Fecha modal e Volta para a tela do browser
   */
  private fechaTela(){

    this.fechaModalCancelar();
    this.router.navigateByUrl("browser-usuario");
  }
  

  /**
   * @description: Fecha modal de cancelamento
   */
  private fechaModalCancelar(){

    $( '#'+this.idModal ).modal('hide');
  }

  
 /**
   * @description  Valida se campos estão vazios.
   * @returns true caso algum campo esteja vazio, false caso contrário.
   */
 private isEmpty(){

   return this.usuario.cpf == undefined || 
          this.usuario.cpf.trim() ==''  || 
          this.usuario.cpf == null      ||

          this.usuario.nome == undefined||
          this.usuario.nome.trim() =='' ||
          this.usuario.nome == null     ||


          this.usuario.bloqueado == undefined ||
          this.usuario.bloqueado == null      ? true : false;
  }  


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + UsuarioComponent.countErros++  ;
    console.log(this.errosApi);
  }


 /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param {String} mensagem mensagem de aviso que deverá ser apresentada
   */
  setMensagemAviso(mensagem:String){

    this.errosApi = null;
    this.mensagemAviso = mensagem + " /message: " + UsuarioComponent.countErros++;
    console.log(this.mensagemAviso);
  }   
}
