// MODULOS PADRÕES
import { CanActivate , Router } from '@angular/router';
import { Injectable  } from '@angular/core';
// MODULOS PERSONALIZADOS
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router: Router) { }

  /**
   * @description Verifica se a navegação para uma rota é permitida, caso não seja,
   *              redireciona o usuario para o login
   * @see https://angular.io/api/router/CanActivate
   */
  public canActivate(): boolean {

    if (!this.auth.isAutenticado()) {

      this.router.navigate(['login']);
      console.log("Usuário não autenticado!!!");
      return false;

    }

    return true;
  }
  
}
