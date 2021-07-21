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
  ff: Favorites | null = null;
  base: string = "";

  @Input() questionId: number | null = null;
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

  clickme3(userId: string, questionId: number) {
    this.userId = userId;
    this.questionId = questionId
    this.deleteFavorite(this.userId, this.questionId);
  }

  deleteFavorite(userId: string, questionId: number) {
    let f: Favorites = { questionID: questionId, userID: userId, favoriteID: null }
    this.http.delete<Favorites>(this.base + '/' + f.userID + '/d=' + f.questionID).subscribe(fList => {
      this.ff = fList;
      this.getFavorites(userId);
      console.log(fList);
    })
  }
}
