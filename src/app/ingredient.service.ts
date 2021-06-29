import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient:HttpClient) { }

  saveIngredient(data:any):Observable<any>{

    let authToken = localStorage.getItem("authToken")
    let headers = new HttpHeaders().set("authToken",authToken)

  return  this.httpClient.post(environment.api_url+"/api/ingredient",data,{headers:headers})
  }

}
