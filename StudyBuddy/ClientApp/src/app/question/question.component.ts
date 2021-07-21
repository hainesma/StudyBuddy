import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { Questions } from "../questions";
import { FavoriteService } from "../favorite.service";
import { Router } from "@angular/router";

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

  constructor(private http: HttpClient, private favorite: FavoriteService, private router: Router, @Inject('BASE_URL') baseUrl) {
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
  getAnswer(userSelection: number) {
    this.http.get<Questions>(this.base + '/Id=' + userSelection)
      .subscribe(qList => {
        this.answer = qList;
        console.log(qList)
        this.router.navigate(['/answer'], { state: { id: userSelection } });
      })
  }
}

