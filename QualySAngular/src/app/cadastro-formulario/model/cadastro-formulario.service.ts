// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService } from './../../usuario/model/usuario.service';
import { CadastroFormulario } from './cadastro-formulario';
import { host, port         } from './../../rootHost';

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
              private usuario:UsuarioService) {
                
    httpOption.headers =  httpOption.headers.set("x-access-token", this.usuario.getAuth().getToken() );
  }


  /**
   * @description Envia solicitação para API salvar o formulario na base de dados
   * @param {CadastroFormulario} formulario formulario a ser salvo na base de dados.
   */
  salvaFormulario(formulario:CadastroFormulario): Observable<CadastroFormulario> {

    return this.http.post<CadastroFormulario>(this.formularioApi, formulario, httpOption)
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
  atualizaFormulario(formulario:CadastroFormulario): Observable<CadastroFormulario> {
    
    return this.http.put<CadastroFormulario>(this.formularioApi, formulario, httpOption)
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
  deletaFormulario(id_formulario:number): Observable<CadastroFormulario> {
    
    return this.http.delete<CadastroFormulario>(this.formularioApi + "/" + id_formulario, httpOption )
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
 getAllCabecalhoFormularios() : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi, httpOption)
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
 findItensFormularioPorId(id:number) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/" + id, httpOption)
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
 findFormularioPorId(id:number) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/id/" + id, httpOption)
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
 getFormulariosPorDescricao(descricao:String) : Observable<CadastroFormulario[]>{

  return this.http.get<CadastroFormulario[]>(this.formularioApi + "/descricao/" + descricao, httpOption )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );

 }


 /**
  * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
  * @param error erros gerados ao fazer solicitações à API
  * @returns retorna uma string contendo o erro que acontenceu. 
  */
 errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
 }
 
}
