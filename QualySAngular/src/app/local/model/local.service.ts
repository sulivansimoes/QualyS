// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Local                   } from './local';
import { host, port              } from '../../config/rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")
}

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private localApi : string = host+port+"/api/local"

  constructor(private http : HttpClient,
              private usuario:UsuarioService) { }

  
 /**
  * @description envia solicitação para API salvar local na base de dados.
  * @param local objeto da local que deve ser salva.
  * @returns Observable 
  */
  public salvaLocal(local : Local) : Observable<Local> {

    return this.http.post<Local>(this.localApi, local, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  }


 /**
  * @description envia solicitação para API atualizar local na base de dados.
  * @param local objeto da local que deve ser atualizada.
  * @returns Observable
  */
  public atualizaLocal(local : Local): Observable<Local>{

    return this.http.put<Local>(this.localApi, local, this.getHttOption() )
                    .pipe(
                           catchError(
                                       this.errorHandler
                                     )
                          );    
  } 


 /**
  * @description envia solicitação para API deletar local da base de dados.
  * @param idLocal id do local que deve ser deletado
  * @returns Observable
  */
  public deletaLocal(idLocal : number) {

    return this.http.delete<Local>( this.localApi + "/" + idLocal, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }  


 /**
  * @description envia solicitação para API consultar todas as locais cadastradas 
  *              na base de dados.
  */
  public getAllLocais() : Observable<Local[]>{

    return this.http.get<Local[]>(this.localApi, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }


 /**
  * @description envia solicitação para API consultar as locais pela descrição.
  * @param descricao, descricao das locais a serem localizadas. 
  * @returns Observable
  */
  public getLocaisPorDescricao(descricao:String) : Observable<Local[]>{

    return this.http.get<Local[]>(this.localApi + "/" + descricao, this.getHttOption() )
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
