import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Favorites } from './favorites';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {
  constructor(private http: HttpClient) {
  }
    //concatonating / appending our Favorites into our base url
  getFavorites(@Inject('BASE_URL') baseUrl: string): any {
    return this.http.get<Favorites[]>(baseUrl + 'Favorite/all' );
  }

}
