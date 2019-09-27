// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService          } from './../../usuario/model/usuario.service';
import { Frequencia              } from './frequencia';
import { host, port              } from '../../config/rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")
}

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {

  private frequenciaApi : string =  host+port+"/api/frequencia"

  constructor(private http : HttpClient,
              private usuario : UsuarioService) { }


 /**
  * @description envia solicitação para API salvar frequencia na base de dados.
  * @param frequencia objeto da frequencia que deve ser salva.
  * @returns Observable 
  */
  salvaFrequencia(frequencia : Frequencia) : Observable<Frequencia> {

    return this.http.post<Frequencia>(this.frequenciaApi, frequencia, this.getHttOption() )
                    .pipe(
                            catchError(
                                         this.errorHandler
                                      )
                          ); 
  }


 /**
  * @description envia solicitação para API atualizar frequencia na base de dados.
  * @param frequencia objeto da frequencia que deve ser atualizada.
  * @returns Observable
  */
  atualizaFrequencia(frequencia : Frequencia): Observable<Frequencia>{

    return this.http.put<Frequencia>(this.frequenciaApi, frequencia, this.getHttOption() )
                    .pipe(
                           catchError(
                                       this.errorHandler
                                     )
                          );    
  }


 /**
  * @description envia solicitação para API deletar frequencia da base de dados.
  * @param idFrequencia id da frequencia que deve ser deletada
  * @returns Observable
  */
  deletaFrequencia(idFrequencia : Frequencia) {

    return this.http.delete<Frequencia>( this.frequenciaApi + "/" + idFrequencia, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }


 /**
  * @description envia solicitação para API consultar todas as frequencias cadastradas 
  *              na base de dados.
  */
  getAllFrequencias() : Observable<Frequencia[]>{

    return this.http.get<Frequencia[]>(this.frequenciaApi, this.getHttOption() )
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          );
  }


 /**
  * @description envia solicitação para API consultar as frequencias pela descrição.
  * @param descricao, descricao das frequencias a serem localizadas. 
  * @returns Observable
  */
  getFrequenciasPorDescricao(descricao:String) : Observable<Frequencia[]>{

    return this.http.get<Frequencia[]>(this.frequenciaApi + "/" + descricao, this.getHttOption() )
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
    
    // console.log("Frequencia / httpOption.headers = ", httpOption.headers.keys() );
    // console.log("Frequencia / x-access-token = ", httpOption.headers.get("x-access-token") );

    return httpOption;
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
