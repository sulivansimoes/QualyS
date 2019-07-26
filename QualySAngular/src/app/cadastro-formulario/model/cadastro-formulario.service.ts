// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { CadastroFormulario } from './cadastro-formulario';


const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class CadastroFormularioService {

  private formularioApi : string = "http://localhost:3000/api/formulario"

  constructor(private http : HttpClient) { }


  salvaFormulario(formulario:CadastroFormulario): Observable<CadastroFormulario> {

    console.log(formulario);
    return this.http.post<CadastroFormulario>(this.formularioApi, formulario, httpOption)
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  }


  //UPDATE

  //DELETAR

  //PESQUISAR

  /**
  * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
  * @param error erros gerados ao fazer solicitações à API
  * @returns retorna uma string contendo o erro que acontenceu. 
  */
 errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
 }
 
}
