import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { Questions } from "../questions";
import { FavoriteService } from "../favorite.service";
import { QuestionService } from "../question.service";
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  providers: [FavoriteService, QuestionService, RouterModule]
})
/** Answer component*/
export class AnswerComponent {

  qJSON: string = "Answer";
  question: Questions[] = [];
  base: string = "";
  answer: Questions ;
  constructor(private http: HttpClient, private favorite: FavoriteService, private router: Router, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + "Question";
    console.log(this.router.getCurrentNavigation().extras.state.id);
    let id = this.router.getCurrentNavigation().extras.state.id;
    this.getAnswer(id);
  }

  getAnswer(userSelection: number) {
    this.http.get<Questions>(this.base + '/Id=' + userSelection)
      .subscribe(qList => {
        this.answer = qList;
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
