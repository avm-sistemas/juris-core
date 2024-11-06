import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,                
                private storeService: StoreService,
                private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        console.log('interceptor => ', request);

        this.storeService.token$.subscribe(
            (token: string) => {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${token}`,                        
                        'Cache-Control': 'private, no-cache, no-store, max-age=0, proxy-revalidate, s-maxage=0, must-revalidate, post-check=0, pre-check=0',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }                
                });
            }
        )
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {                
                if (event instanceof HttpResponse) {
                    if (!event.ok) {
                        /*
                        const currentSessionUser = this.sessionService.getItem('currentUser');
                        if (currentSessionUser === null || currentSessionUser === undefined) {
                            if (!environment.production) {
                                console.log('Serviço de Autenticação estava logado mas a sessão está expirada.');
                                console.log('Serviço de Autenticação será forçado a deslogar.');
                            }
                            this.authenticationService.logout();                
                            this.router.navigate(["/"]);
                        } 
                        */           
                    }
                }                
                return event;
            }));
    }
}
