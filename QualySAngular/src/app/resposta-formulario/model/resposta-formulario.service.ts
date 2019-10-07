// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { UsuarioService     } from './../../usuario/model/usuario.service';
import { RespostaFormulario } from './resposta-formulario';
import { host, port         } from '../../config/rootHost';

const httpOption = {
  headers: new HttpHeaders()
                           .append("Content-Type","application/json")
                           .append("x-access-token","")
}

@Injectable({
  providedIn: 'root'
})
export class RespostaFormularioService {

  private respostaFormularioApi : string = host+port+"/api/resposta-formulario";
  private relatorioApi : string  = host+port+"/api/relatorio/resposta-formulario";

  constructor(private http : HttpClient,
              private usuario:UsuarioService) { }

  
 /**
  * @description envia solicitação para API salvar respostaFormulario na base de dados.
  * @param respostaFormulario objeto da respostaFormulario que deve ser salva.
  * @returns Observable 
  */
  public salvaRespostaFormulario(respostaFormulario : RespostaFormulario) : Observable<RespostaFormulario> {

    return this.http.post<RespostaFormulario>(this.respostaFormularioApi, respostaFormulario, this.getHttOption() )
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
 public getVistoriasRealizadas(daEmissao, ateEmissao, formulario) : Observable<RespostaFormulario[]> {
   
  return this.http.get<RespostaFormulario[]>(this.relatorioApi + "/vistorias-realizadas/"+daEmissao+"/"+ateEmissao+"/"+formulario, this.getHttOption() )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        ); 
 }


 /**
  * @description envia solicitação para API recuperar as quantidade de vistorias realizadas e quantidade de vistorias que geraram inconformes
  * @param ano, ano que deverá ser consultado, o ano não deve vir null, ao contrário dos outros parametros, este é obrigatório. 
  * @param mes, mes que deverá ser consultado, se passado null o mês não será considarado.
  * @param dia, dia que deverá ser consultado, se passado null o dia não será considarado.
  * @returns Observable 
  */
 public getVistoriasRealizadasEVistoriasComInconformes(ano, mes?,dia?) : Observable<RespostaFormulario[]>{

    return this.http.get<RespostaFormulario[]>(this.relatorioApi + "2" + "/vistorias-realizadas/"+ano+"/"+mes+"/"+dia, this.getHttOption() )
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
