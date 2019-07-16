// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {catchError               } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Frequencia              } from './frequencia';


const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {

  private frequenciaApi : string = "http://localhost:3000/api/frequencia"

  constructor(private http : HttpClient) { }


  /**
   * @description envia solicitação para API salvar frequencia na base de dados.
   * @param frequencia objeto da frequencia que deve ser salva.
   * @returns Observable 
   */
  salvaFrequencia(frequencia : Frequencia) : Observable<Frequencia> {

    return this.http.post<Frequencia>(this.frequenciaApi, frequencia, httpOption);
  }


  /**
   * @description envia solicitação para API deletar frequencia da base de dados.
   * @param frequencia objeto da frequencia que deve ser deletada
   * @returns Observable
   */
  deletaFrequencia(frequencia : Frequencia) : Observable<Frequencia> {

    return this.http.delete<Frequencia>( this.frequenciaApi + "/" + frequencia.getId() );
  }


  /**
   * @description envia solicitação para API consultar todas as frequencias cadastradas 
   *              na base de dados.
   */
  getAllFrequencias() : Observable<Frequencia[]>{

    return this.http.get<Frequencia[]>(this.frequenciaApi)
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


  // Editar

  // Deletar

  // Pesquisar

}
