import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = "0J3FBNNxGI0Gw9Bh800jVki2oGchkCXL"; //valor de Giphy home
 private _historial: string [] = [];

 get historial() {
   //this._historial = this._historial.splice(0, 10);
   return [...this._historial];
 }

 constructor (private http: HttpClient) {

 }

 buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase(); 

    if (!this._historial.includes(query)) {
        this._historial.unshift(query); 
        this._historial = this._historial.splice(0, 10);
    }

    //console.log(this._historial); 

    this.http.get("https://api.giphy.com/v1/gifs/search?api_key=0J3FBNNxGI0Gw9Bh800jVki2oGchkCXL&q=dragon ball z&limit=10")
    .subscribe( (resp : any) => {
      console.log(resp.data); 
    });
    

 }

}
