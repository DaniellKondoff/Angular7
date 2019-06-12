import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Request is on its way');
        
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'qwe')})
        return next.handle(modifiedRequest)
        
        //return next.handle(req);
    }
}