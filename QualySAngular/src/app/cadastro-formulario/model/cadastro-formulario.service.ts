// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService } from './../../usuario/model/usuario.service';
import { CadastroFormulario } from './cadastro-formulario';
import { host, port         } from '../../config/rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")
}

@Injectable({
  providedIn: 'root'
})
export class CadastroFormularioService {

  private formularioApi : string = host+port+"/api/formulario"

  constructor(private http : HttpClient,
              private usuario:UsuarioService) { }


  /**
   * @description Envia solicitação para API salvar o formulario na base de dados
   * @param {CadastroFormulario} formulario formulario a ser salvo na base de dados.
   */
  public salvaFormulario(formulario:CadastroFormulario): Observable<CadastroFormulario> {

    return this.http.post<CadastroFormulario>(this.formularioApi, formulario, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  }


  /**
   * @description Envia solicitação para API atualizar o formulario da base de dados.
   * @param {CadastroFormulario} formulario - formulario à ser atualizado
   */
  public atualizaFormulario(formulario:CadastroFormulario): Observable<CadastroFormulario> {
    
    return this.http.put<CadastroFormulario>(this.formularioApi, formulario, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  }  
  

  /**
   * @description Envia solicitação para API deletar o formulario da base de dados.
   * @param {number} id_formulario - id do formulario à ser deletado.
   */
  public deletaFormulario(id_formulario:number): Observable<CadastroFormulario> {
    
    return this.http.delete<CadastroFormulario>(this.formularioApi + "/" + id_formulario, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  }


 /**
  * @description envia solicitação para API consultar todas os formularios cadastrados 
  *              na base de dados.
  */
 public getAllCabecalhoFormularios() : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi, this.getHttOption() )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
 }


 /**
  * @description envia solicitação para API localizar determinado formulario [somente os itens] por id cadastrado
  *              na base de dados.
  * @param {number} id - id do formulario que deve ser localizado 
  */
 public findItensFormularioPorId(id:number) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/" + id, this.getHttOption() )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
 }


 /**
  * @description envia solicitação para API localizar determinado formulario por id cadastrado
  *              na base de dados.
  * @param {number} id - id do formulario que deve ser localizado 
  */
 public findFormularioPorId(id:number) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/id/" + id, this.getHttOption() )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
 }


 /**
  * @description envia solicitação para API consultar os formularios pela descrição.
  * @param {String} descricao, descricao dos formularios a serem localizados. 
  * @returns Observable
  */ 
 public getFormulariosPorDescricao(descricao:String) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/descricao/" + descricao, this.getHttOption() )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );

 }


  /**
   * @description: Retorna o httpOption configurado com o token da aplicação no header
   * @obs Essa função esta sendo usada neste classe para pegar o token em realtime e assim garantir que ele ainda existe no local storage e está atualizado
   * @returns httpOption configurado com o token de autenticação
   */
  private getHttOption(){

    httpOption.headers =  httpOption.headers.set("x-access-token", this.usuario.getAuth().getToken() );
    
    return httpOption;
  }    
  

 /**
  * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
  * @param error erros gerados ao fazer solicitações à API
  * @returns retorna uma string contendo o erro que acontenceu. 
  */
 private errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
 }
 
}
