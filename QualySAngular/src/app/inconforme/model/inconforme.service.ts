// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Inconforme              } from './inconforme';
import { host, port              } from '../../config/rootHost';

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
  private relatorioApi : string  = host+port+"/api/relatorio/inconforme";

  constructor(private http : HttpClient,
              private usuario:UsuarioService) { }


 /**
  * @description envia solicitação para API para efetivar correção do inconforme na base de dados.
  * @param inconforme objeto do inconforme que deve ser atualizado.
  * @returns Observable
  */
 public corrigeInconforme(inconforme : Inconforme): Observable<Inconforme>{

    return this.http.put<Inconforme>(this.inconformeApi+"/correcao", inconforme, this.getHttOption() )
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
 public estornaAcaoCorretiva(inconforme : Inconforme): Observable<Inconforme>{

  return this.http.put<Inconforme>(this.inconformeApi+"/estorno", inconforme, this.getHttOption() )
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
  public getInconformesPorEmissao(dataEmissao) : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.inconformeApi + "/" + dataEmissao, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }


  /**
   * @description envia solicitação para API consultar a quantidade de inconformes gerados, resolvidos e pendentes
   *              na base de dados pela da de emissão que foram gerados.
   * @param ano, ano que deverá ser consultado, o ano não deve vir null, ao contrário dos outros parametros, este é obrigatório. 
   * @param mes, mes que deverá ser consultado, se passado null o mês não será considarado.
   * @param dia, dia que deverá ser consultado, se passado null o dia não será considarado.
   */
  public getInconformesGeradosResolvidosPendentes(ano, mes?,dia?) : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.relatorioApi+"/"+ano+"/"+mes+"/"+dia, this.getHttOption() )
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
  public getAllInconformes() : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.inconformeApi, this.getHttOption() )
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
