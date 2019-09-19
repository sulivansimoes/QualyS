// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Inconforme              } from './inconforme';
import { host, port              } from './../../rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")
}

@Injectable({
  providedIn: 'root'
})
export class InconformeService {

  private inconformeApi : string = host+port+"/api/inconforme"

  constructor(private http : HttpClient,
              private usuario:UsuarioService) {

    httpOption.headers =  httpOption.headers.set("x-access-token", this.usuario.getAuth().getToken() );
  }


 /**
  * @description envia solicitação para API para efetivar correção do inconforme na base de dados.
  * @param inconforme objeto do inconforme que deve ser atualizado.
  * @returns Observable
  */
 corrigeInconforme(inconforme : Inconforme): Observable<Inconforme>{

    return this.http.put<Inconforme>(this.inconformeApi+"/correcao", inconforme, httpOption)
                    .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                          );    
 }

 /**
  * @description envia solicitação para API para efetivar o estorno da correção do inconforme na base de dados.
  * @param inconforme objeto do inconforme que deve ser atualizado.
  * @returns Observable
  */
 estornaAcaoCorretiva(inconforme : Inconforme): Observable<Inconforme>{

  return this.http.put<Inconforme>(this.inconformeApi+"/estorno", inconforme, httpOption)
                  .pipe(
                        catchError(
                                    this.errorHandler
                                  )
                        );    
 }

 
  /**
   * @description envia solicitação para API consultar todos inconformes cadastrados 
   *              na base de dados pela da de emissão que foram gerados.
   * @param dataEmissao data de emissão do inconforme
   */
  getInconformesPorEmissao(dataEmissao) : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.inconformeApi + "/" + dataEmissao, httpOption )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }


  /**
   * @description envia solicitação para API consultar todos inconformes cadastrados 
   *              na base de dados.
   */
  getAllInconformes() : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.inconformeApi, httpOption)
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
