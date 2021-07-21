import { Component, Inject, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Favorites } from "../favorites";
import { Questions } from '../questions';
import { QuestionService } from '../question.service';



@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css'],
    providers: [QuestionService]
})
/** Favorite component*/
export class FavoriteComponent {
  fJSON: string = "Favorites";
  favorite: Favorites[] = [];
  base: string = "";
 
  @Input() userId: string | null = null;
  /** Favorite ctor */

  
  constructor(private http: HttpClient, private question: QuestionService, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + 'Favorite'
    this.getFavorites(this.userId);
  }

  clickme(userId: string) {
    this.userId = userId;
    this.getFavorites(this.userId);
  }

  getFavorites(userId: string) {
    this.http.get<Favorites[]>(this.base + '/User=' + userId)
      .subscribe(fList => {
        this.favorite = fList;
        console.log(fList);
      })
  }
}
