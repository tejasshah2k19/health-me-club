
import { Injectable } from '@angular/core'; 
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("i am inside interceptor......." + request.url);
    let authToken = localStorage.getItem("authToken")
    if (!request.url.includes("api")) {
      console.log("signup or login");
      return next.handle(request);
    } else {
      console.log("api");
      const modifiedRequest = request.clone({
        headers: request.headers.set("authToken", authToken)
      })

      return next.handle(modifiedRequest).pipe(
        catchError( (error) => {
          console.log("error in interceptor");
            if(error instanceof HttpErrorResponse){
                switch(error.status){
                    case 401:
                      console.log("please login before access")
                      //this.router.navigateByUrl("/login")
                      break;
                    case 500:
                       console.log("something went wrong please try aftersome...")
                       break;
                    case 403:
                       console.log("unathorized")
                       break;
                }              
            }

          return throwError(error.message)
        })
      )
    }
  }
}
