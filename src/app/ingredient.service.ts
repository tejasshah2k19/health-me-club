import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) { }

  saveIngredient(data: any): Observable<any> {

    let authToken = localStorage.getItem("authToken")
    let headers = new HttpHeaders().set("authToken", authToken)

    // return this.httpClient.post(environment.api_url + "/api/ingredient", data, { headers: headers })

    return this.httpClient.post(environment.api_url + "/api/ingredient", data).pipe(
     catchError(err=>{
       console.log("error => "+err)
        return throwError(err);  
    })
    )
  }


  getAllIngredients(): Observable<any> {

    let authToken = localStorage.getItem("authToken")
    let headers = new HttpHeaders().set("authToken", authToken)
    //  return this.httpClient.get(environment.api_url + "/api/ingredients", { headers: headers })
   return this.httpClient.get(environment.api_url + "/api/ingredients")

  }
}
