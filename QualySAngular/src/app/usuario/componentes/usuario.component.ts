// COMPONTENTES PADRÕES
import { Component, OnInit     } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription          } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Usuario                 }  from './../model/usuario';
import { UsuarioService          } from './../model/usuario.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';

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
  private SIZE_SENHA  = 10;

  private inscricao          = new Subscription;
  private usuario:Usuario    = new Usuario();
  private camposObrigatorios = false;
  private mensagemAviso      = null;
  private errosApi           = null;
  private confirmaSenha:string;

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
   * @description Função valida se informações do formulário estão corretas. Vê se o que está sendo feito
   *              é atualização ou salvamento de um novo registro e chama a função responsável pela ação.
   */
  private salva(){

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

    //-----------------------------------------------------
    // Validando senha 
    //-----------------------------------------------------
    if(this.usuario.senha != this.confirmaSenha){

      this.setMensagemAviso("As senhas não coincidem! Preencha os campos de senha corretamente.")
      return;
    }

    if(this.usuario.cpf){
      
      this.atualizaUsuario();
    }else{
      
      this.salvaUsuario();
    }
  } 


  /**
   * Resumo: Salva novo usuario.
   */
  private salvaUsuario(){

    this.usuarioService.salvaUsuario(this.usuario)
                       .subscribe( 
                                    result =>{ 
                                                alert("deu certo salvamento");
                                                this.usuario = new Usuario();
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
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-usuario");
    }
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
    this.mensagemAviso = mensagem + " message: " + UsuarioComponent.countErros++;
    console.log(this.mensagemAviso);
  }   
}
