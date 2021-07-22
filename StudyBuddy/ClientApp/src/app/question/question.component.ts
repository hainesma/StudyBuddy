import { HttpClient } from "@angular/common/http";
import { Component, Inject, Input } from "@angular/core";
import { Questions } from "../questions";
import { FavoriteService } from "../favorite.service";
import { Router } from "@angular/router";
import { Favorites } from "../favorites";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [FavoriteService]
})
/** Question component*/
export class QuestionComponent {

  qJSON: string = "Questions";
  question: Questions[] = [];
  answer: Questions;
  base: string = "";
  
  fJSON: string = "Favorites";
  favorite: Favorites[] = [];
  base2: string = "";
  @Input() questionId: number | null = null;
  @Input() userId: string | null = null;

  constructor(private http: HttpClient, private favorites: FavoriteService, private router: Router, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + "Question";
    this.base2 = baseUrl + "Favorite"
    this.getQuestions();
  }

  getQuestions() {
    this.http.get<Questions[]>(this.base+ '/All')
      .subscribe(qList => {
        this.question = qList;
        console.log(qList)
      })
  }

  clickme2(userId: string, questionId: number) {
    this.userId = userId;
    this.questionId = questionId;
    this.addFavorite(this.userId, this.questionId);
  }

  addFavorite(userId: string, questionId: number) {
    let f: Favorites = { questionID: questionId, userID: userId, favoriteID: null }
    this.http.post<Favorites[]>(this.base2 +"/" + userId + "/id=" + questionId, f).subscribe(fList => {
      this.favorite = fList;
      console.log(fList);
    })
  }
  
  hidePost: boolean = true;

  togglePost() {
    this.hidePost = !this.hidePost,
      this.changeHidden();
  }

  changeHidden() {
    this.styleList = {
      'display': this.hidePost ? 'none' : 'block'
    }
  }
  styleList: object = {
    'display': this.hidePost ? 'none' : 'block'

  }
  getAnswer(userSelection: number) {
    this.http.get<Questions>(this.base + '/Id=' + userSelection)
      .subscribe(qList => {
        this.answer = qList;
        console.log(qList)
        this.router.navigate(['/answer'], { state: { id: userSelection } });
      })
  }
}

