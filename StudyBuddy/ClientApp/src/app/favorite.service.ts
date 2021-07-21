import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Favorites } from './favorites';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {
  constructor(private http: HttpClient) {
  }

  getFavorites(@Inject('BASE_URL') baseUrl: string): any {
    return this.http.get<Favorites[]>(baseUrl + 'Favorite');
  }
}
