// MÓDULOS PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Usuario                 } from './usuario';
import { host, port         } from './../../rootHost';

const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioApi : string = host+port+"/api/usuario"

  constructor(private http : HttpClient) { }

 
  /**
    * @description envia solicitação para API salvar usuario na base de dados.
    * @param usuario objeto da usuario que deve ser salva.
    * @returns Observable 
    */
  salvaUsuario(usuario : Usuario) : Observable<Usuario> {
 
      return this.http.post<Usuario>(this.usuarioApi, usuario, httpOption)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            ); 
  } 


  /**
    * @description envia solicitação para API atualizar usuario na base de dados.
    * @param usuario objeto da usuario que deve ser atualizada.
    * @returns Observable
    */
  atualizaUsuario(usuario : Usuario): Observable<Usuario>{
  
      return this.http.put<Usuario>(this.usuarioApi, usuario, httpOption)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );    
  }
  

  /**
    * @description envia solicitação para API deletar usuario da base de dados.
    * @param cpfUsuario cpf do usuario que deve ser deletada
    * @returns Observable
    */
  deletaUsuario(cpfUsuario : String) {

      return this.http.delete<Usuario>( this.usuarioApi + "/" + cpfUsuario )
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );
  } 


  /**
    * @description envia solicitação para API consultar todas as Usuarios cadastradas 
    *              na base de dados.
    */
  getAllUsuarios() : Observable<Usuario[]>{

      return this.http.get<Usuario[]>(this.usuarioApi)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );
  } 


  /**
    * @description envia solicitação para API consultar as usuarios pelo nome.
    * @param nome, nome dos usuarios a serem localizadas. 
    * @returns Observable
    */
  getUsuariosPorNome(nome:String) : Observable<Usuario[]>{

      return this.http.get<Usuario[]>(this.usuarioApi + "/" + nome )
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
