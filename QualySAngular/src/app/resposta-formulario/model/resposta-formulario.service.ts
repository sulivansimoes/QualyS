// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { RespostaFormulario } from './resposta-formulario';


const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class RespostaFormularioService {

  private respostaFormularioApi : string = "http://localhost:3000/api/resposta-formulario"

  constructor(private http : HttpClient) { }

  
 /**
  * @description envia solicitação para API salvar respostaFormulario na base de dados.
  * @param respostaFormulario objeto da respostaFormulario que deve ser salva.
  * @returns Observable 
  */
  salvaRespostaFormulario(respostaFormulario : RespostaFormulario) : Observable<RespostaFormulario> {

    return this.http.post<RespostaFormulario>(this.respostaFormularioApi, respostaFormulario, httpOption)
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
