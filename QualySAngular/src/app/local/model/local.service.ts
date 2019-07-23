// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Local                   } from './local';


const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private localApi : string = "http://localhost:3000/api/local"

  constructor(private http : HttpClient) { }

  
 /**
  * @description envia solicitação para API salvar local na base de dados.
  * @param local objeto da local que deve ser salva.
  * @returns Observable 
  */
  salvaLocal(local : Local) : Observable<Local> {

    return this.http.post<Local>(this.localApi, local, httpOption)
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
  atualizaLocal(local : Local): Observable<Local>{

    return this.http.put<Local>(this.localApi, local, httpOption)
                    .pipe(
                           catchError(
                                       this.errorHandler
                                     )
                          );    
  } 


 /**
  * @description envia solicitação para API deletar local da base de dados.
  * @param local objeto da local que deve ser deletada
  * @returns Observable
  */
  deletaLocal(local : Local) {

    return this.http.delete<Local>( this.localApi + "/" + local.id )
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
  getAllLocais() : Observable<Local[]>{

    return this.http.get<Local[]>(this.localApi)
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
  getLocaisPorDescricao(descricao:String) : Observable<Local[]>{

    return this.http.get<Local[]>(this.localApi + "/" + descricao )
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
