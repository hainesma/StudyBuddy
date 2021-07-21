import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { Questions } from "../questions";
import { FavoriteService } from "../favorite.service";

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
  base: string = "";

  constructor(private http: HttpClient, private favorite: FavoriteService, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + "Question";
    this.getQuestions();
  }

  getQuestions() {
    this.http.get<Questions[]>(this.base+ '/All')
      .subscribe(qList => {
        this.question = qList;
        console.log(qList)
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
}

