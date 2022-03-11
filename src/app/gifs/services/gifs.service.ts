import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

 private apiKey: string = "0J3FBNNxGI0Gw9Bh800jVki2oGchkCXL"; //valor de Giphy home
 private _historial: string [] = [];
 
 //TODO. Cambiar any por su tipo
 public resultados: Gif [] = [];

 get historial() {
   //this._historial = this._historial.splice(0, 10);
   return [...this._historial];
 }

 constructor (private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem("historial") !) || [];
 }

 buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase(); 

    if (!this._historial.includes(query)) {
        this._historial.unshift(query); 
        this._historial = this._historial.splice(0, 10);

        localStorage.setItem("historial", JSON.stringify(this._historial));
    }

    //console.log(this._historial); 

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=0J3FBNNxGI0Gw9Bh800jVki2oGchkCXL&q=${query}&limit=10`)
    .subscribe( (resp) => {
      console.log(resp.data); 
      this.resultados = resp.data; 
    });
    

 }

}
