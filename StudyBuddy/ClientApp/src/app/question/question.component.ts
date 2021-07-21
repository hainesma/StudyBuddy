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
  removeQ: Questions;
  base: string = "";

  constructor(private http: HttpClient, private favorites: FavoriteService, private router: Router, @Inject('BASE_URL') baseUrl) {
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

