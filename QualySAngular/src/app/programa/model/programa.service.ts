// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Programa                } from './programa';
import { host, port              } from '../../config/rootHost';

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
              private usuario:UsuarioService) { }

  /**
   * @description: Envia solicitação para API salvar programa na base de dados.
   * @param   {Programa  } programa -  objeto da programa que deve ser salva.
   * @returns {Observable} observable 
   */
  public salvaPrograma(programa : Programa) : Observable<Programa> {

    return this.http.post<Programa>(this.programaApi, programa, this.getHttOption() )
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
 public  atualizaPrograma(programa : Programa): Observable<Programa>{
 
    return this.http.put<Programa>(this.programaApi, programa, this.getHttOption() )
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
  public deletaPrograma(idPrograma : Number) {
 
    return this.http.delete<Programa>( this.programaApi + "/" + idPrograma, this.getHttOption() )
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
  public getAllProgramas() : Observable<Programa[]>{

    return this.http.get<Programa[]>(this.programaApi, this.getHttOption() )
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
 public getProgramasPorDescricao(descricao:String) : Observable<Programa[]>{

    return this.http.get<Programa[]>(this.programaApi + "/" + descricao, this.getHttOption() )
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
   * @param   {HttpErrorResponse} error - erros gerados ao fazer solicitações à API
   * @returns {String           } retorna uma string contendo o erro que acontenceu. 
   */
  private errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
  }  

}
