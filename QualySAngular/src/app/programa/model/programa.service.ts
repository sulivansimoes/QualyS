// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Programa                } from './programa';
import { host, port              } from './../../rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")}

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private programaApi : string = host+port+"/api/programas"

  constructor(private http : HttpClient,
              private usuario:UsuarioService) { 

    httpOption.headers =  httpOption.headers.set("x-access-token", this.usuario.getAuth().getToken() );
  }

  /**
   * @description: Envia solicitação para API salvar programa na base de dados.
   * @param   {Programa  } programa -  objeto da programa que deve ser salva.
   * @returns {Observable} observable 
   */
  salvaPrograma(programa : Programa) : Observable<Programa> {

    return this.http.post<Programa>(this.programaApi, programa, httpOption)
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );                                              
  }


 /**
  * @description envia solicitação para API atualizar programa na base de dados.
  * @param   {Programa  } programa - objeto da programa que deve ser atualizada.
  * @returns {Observable} observable 
  */
  atualizaPrograma(programa : Programa): Observable<Programa>{
 
    return this.http.put<Programa>(this.programaApi, programa, httpOption)
                    .pipe(
                           catchError(
                                       this.errorHandler
                                     )
                          );    
  }

 
 /**
  * @description envia solicitação para API deletar programa da base de dados.
  * @param   {Number  } idPrograma - id do programa que deve ser deletado
  * @returns {Observable} Observable
  */
  deletaPrograma(idPrograma : Number) {
 
    return this.http.delete<Programa>( this.programaApi + "/" + idPrograma, httpOption )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }
 
  
 /**
  * @description envia solicitação para API consultar todos os programas cadastradas 
  *              na base de dados.
  */
  getAllProgramas() : Observable<Programa[]>{

    return this.http.get<Programa[]>(this.programaApi, httpOption)
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }  


 /**
  * @description envia solicitação para API consultar as programas pela descrição.
  * @param   {Programa  } descricao - descricao das programas a serem localizadas. 
  * @returns {Observable} Observable
  */
 getProgramasPorDescricao(descricao:String) : Observable<Programa[]>{

    return this.http.get<Programa[]>(this.programaApi + "/" + descricao, httpOption )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );  
  }


  /**
   * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
   * @param   {HttpErrorResponse} error - erros gerados ao fazer solicitações à API
   * @returns {String           } retorna uma string contendo o erro que acontenceu. 
   */
  errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
  }  

}
