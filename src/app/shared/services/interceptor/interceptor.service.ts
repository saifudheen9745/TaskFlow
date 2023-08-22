import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment'
import { userAuthResponse } from 'src/app/config/config.types';
import { addUserDetails } from '../../ngrx/ngrx.actions';
import { selectUserDetails } from '../../ngrx/ngrx.selectors';

const excludedUrl: string[] = [
  '',
  '/signup'
];



@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  accessToken: string;

  constructor(private store: Store, private http: HttpClient) {
    this.store
      .select(selectUserDetails)
      .subscribe((data: userAuthResponse) => {
        this.accessToken = data.accessToken;
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Intercept the request before it is sent
    let modifiedReq: HttpRequest<any> = req;
    const url = req.url.split(environment.baseUrl)[1];

    modifiedReq = req.clone({ withCredentials: true });

    if (!excludedUrl.includes(url)) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    }

    return next.handle(modifiedReq).pipe(
      tap(
        (event) => {
          // Intercept the response (status 2xx)
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          // Intercept errors
          if (error instanceof HttpErrorResponse) {
            console.error('Error occurred:');
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        // Intercept the response error
        if (error.status === 403) {
          // Request a new token when receiving a 403 response

          return this.requestNewAccessToken().pipe(
            mergeMap((newToken: any) => {
              console.log('new token received');
              
              this.store.dispatch(
                addUserDetails({
                  newData:newToken
                })
              );
              // Retry the original request with the new access token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.accessToken}`,
                },
              });
              return next.handle(retryReq);
            }),
            catchError((newTokenError) => {
              console.error('Error refreshing access token:', newTokenError);
              // Return the original error if token refresh fails
              throw newTokenError
            })
          );
        } else {
          // Pass through the error if it's not a 403 response
           throw error
        }
      })
    );
  }

  requestNewAccessToken(): Observable<string> {
    console.log('requesting new token');
    
    return this.http.get<string>(`${environment.baseUrl}/token`);
  }
}
