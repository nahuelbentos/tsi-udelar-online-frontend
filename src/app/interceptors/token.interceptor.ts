import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private toast: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('token', this.autenticacionService.getToken());

    this.blockUI.start();

    if (this.autenticacionService.getUser()) {
      const token = this.autenticacionService.getToken();
      console.log('token', token);
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        console.log('1) event:: ', event);
        if (event instanceof HttpResponse) {
          console.log('2) event:: ', event);

          if (event.status !== 200) {
            this.toast.error('Ocurrio algo raro!', 'Ver que onda..', {
              timeOut: 3000,
            });
          }
        }

        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.toast.error(err.error.errores.mensaje);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }

        return throwError(err);
      }),
      finalize(() => this.blockUI.stop())
    );
  }
}
