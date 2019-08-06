// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Inconforme } from './inconforme';


const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class InconformeService {

  private inconformeApi : string = "http://localhost:3000/api/inconforme"

  constructor(private http : HttpClient) { }

  // Salvar

  // Editar

  // Deletar

  // Pesquisar

  /**
   * @description envia solicitação para API consultar todos inconformes cadastrados 
   *              na base de dados.
   */
  getAllInconformes() : Observable<Inconforme[]>{

    return this.http.get<Inconforme[]>(this.inconformeApi)
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
