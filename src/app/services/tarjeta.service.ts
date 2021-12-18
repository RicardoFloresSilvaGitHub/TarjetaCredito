import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'http://localhost:48888/';
  private myApiUrl = 'api/tarjeta/';


  /*http://localhost:48888/swagger/index.html*/


  constructor(private http: HttpClient) {

  }

  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id:number):Observable<any>{
    return  this.http.delete(this.myAppUrl + this.myApiUrl+id);

  }

  saveTarjeta(tarjeta:any):Observable<any>{
    return  this.http.post(this.myAppUrl + this.myApiUrl,tarjeta);

  }

  updateTarjeta(id:any, tarjeta:any):Observable<any>{
    try{
    return  this.http.put(this.myAppUrl + this.myApiUrl + id,tarjeta);
    }
    catch(e){
      alert(e);
      return tarjeta;
    }

  }
}
