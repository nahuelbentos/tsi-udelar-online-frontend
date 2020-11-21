import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioRole } from '../models/usuario-role.model';
import { UsuarioSesion } from '../models/usuario-sesion.model';
import { AutenticacionService } from '../services/autenticacion.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.haveRole(route, state);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.haveRole(childRoute, state);
  }

  private haveRole(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = next.data.role ? next.data.role : next.parent.data.role;

    const usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
    const data = new UsuarioRole(usuarioLogueado.email, role);

    return this.usuarioService.haveRole(data).pipe(
      tap((isValid) => {
        if (!isValid) {
          localStorage.clear();
          this.router.navigateByUrl('');
        }
      })
    );
  }
}
