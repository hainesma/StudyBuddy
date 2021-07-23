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
  reducedList: Favorites[] = [];

  @Input() questionId: number | null = null;
  @Input() userId: string | null = document.cookie;
  /** Favorite ctor */

  
  constructor(private http: HttpClient, private question: QuestionService, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + 'Favorite'
    this.getFavorites(this.userId);

    console.log(document.cookie);
    // Values is the array of strings resulting from splitting up the cookie
    let values = document.cookie.split(';');
    console.log(values);
    console.log(values.length);
    // This for loop cuts down each string to the actual UserId
    for (let i = 0; i < values.length; i++) {
      let v = values[i];
      let kvp = v.split('=');
      console.log(kvp[0]);
      if (kvp[0].trim() === "UserId") {
        this.userId = (kvp[1]);
      }
    }
  }

  getUserId(userId: string) {
    console.log(this.userId);
    this.userId = userId;
    if (this.userId.includes(';')) {
      document.cookie = this.userId.replace(';', ' ')
    } else {
      document.cookie = this.userId;
    }

    console.log(document.cookie);
    console.log(this.userId);
  }

  clickme(userId: string) {
    this.userId = userId;
    this.getFavorites(this.userId);

  }

  getFavorites(userId: string) {
    console.log(this.userId);
    this.http.get<Favorites[]>(this.base + '/User=' + this.userId)
      .subscribe(fList => {
        this.favorite = fList;
        console.log(fList);
        console.log(this.favorite);
      })

    //this.cleanUpFavoritesList(this.favorite);
  }

  clickme3(questionId: number) {
    this.questionId = questionId;
    console.log(this.userId);
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

  //cleanUpFavoritesList(favorite: Favorites[]) {

    
  //  for (let i = 0; i < this.favorite.length; i++) {
  //    // if reducedList doesn't contain the favorite from list favorite already, add it
  //    for (let j = 0; j < this.reducedList.length; j++) {
  //      if (this.reducedList[j].userID !== this.favorite[i].userID && this.reducedList[j].questionID !== this.favorite[i].questionID) {
  //        this.reducedList.push(this.favorite[i]);
  //      }
  //    }
      
  //  }
  //  console.log(this.reducedList);
  //}
}
