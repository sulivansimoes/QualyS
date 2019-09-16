// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { RespostaFormulario } from './resposta-formulario';
import { host, port         } from './../../rootHost';

const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class RespostaFormularioService {

  private respostaFormularioApi : string = host+port+"/api/resposta-formulario"

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
  * @description envia solicitação para API recuperar as vistorias realizadas na base de dados.
  * @param daEmissao, data inicial que a vistoria foi realizada
  * @param ateEmissao, data final que a vistoria foi realizada
  * @param formulario código do formulario que a consulta deverá considerar
  * @returns Observable 
  */
 getVistoriasRealizadas(daEmissao, ateEmissao, formulario) : Observable<RespostaFormulario[]> {
   
  return this.http.get<RespostaFormulario[]>(this.respostaFormularioApi + "/vistorias-realizadas/"+daEmissao+"/"+ateEmissao+"/"+formulario)
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
