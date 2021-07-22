import { HttpClient } from "@angular/common/http";
import { Component, Inject, Input } from "@angular/core";
import { Questions } from "../questions";
import { FavoriteService } from "../favorite.service";
import { Router } from "@angular/router";
import { QuestionService } from "../question.service"
import { Favorites } from "../favorites";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [FavoriteService, QuestionService  ]
})
/** Question component*/
export class QuestionComponent {

  qJSON: string = "Questions";
  question: Questions[] = [];
  answer: Questions;
  removeQ: Questions;
  base: string = "";

  fJSON: string = "Favorites";
  favorite: Favorites[] = [];
  base2: string = "";
  @Input() questionId: number | null = null;
  userId: string | null = document.cookie;

  constructor(private http: HttpClient, private favorites: FavoriteService, private router: Router, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + "Question";
    this.base2 = baseUrl + "Favorite";
    this.getQuestions();

    console.log(document.cookie);
    let values = document.cookie.split(';');
    for (let i = 0; i < values.length; i++) {
      let v = values[i];
      let kvp = v.split('=');
      console.log(kvp[0]);
      //if (kvp[0].trim() === "UserId") {
      //  this.userId = (kvp[1]);
      //}
    }
    this.getUserId(this.userId);
  }

  getQuestions() {
    this.http.get<Questions[]>(this.base+ '/All')
      .subscribe(qList => {
        this.question = qList;
        console.log(qList)
      })
  }

  clickme2(userId: string, questionId: number) {
    this.questionId = questionId;
    this.addFavorite(userId, this.questionId);
    console.log(this.userId);
  }

  addFavorite(userId: string, questionId: number) {
    let f: Favorites = { questionID: questionId, userID: userId, favoriteID: null }

    this.http.post<Favorites[]>(this.base2 + "/" + this.userId + "/id=" + questionId, f).subscribe(fList => {
      this.favorite = fList;
      console.log(fList);
      console.log(this.userId);
    })
  }

  getUserId(userId: string) {
    console.log(this.userId);
    this.userId = userId;
    document.cookie = this.userId;
    console.log(document.cookie);
    console.log(this.userId);
  }

  getAnswer(userSelection: number) {
    this.http.get<Questions>(this.base + '/Id=' + userSelection)
      .subscribe(qList => {
        this.answer = qList;
        console.log(qList)
        this.router.navigate(['/answer'], { state: { id: userSelection } });
      })
  }

  removeQuestion(userSelection: number) {
    let qRemove: Questions = { id: userSelection, text: null, answer: null }
    this.http.delete<Questions>(this.base + '/Delete/Id=' + qRemove.id).subscribe(qList => {
      this.removeQ = qList;
      this.getQuestions();
      console.log(qList);
    })
  }
}

