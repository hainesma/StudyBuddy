import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { Questions} from "../questions";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
/** Question component*/
export class QuestionComponent {
    
    qJSON: string = "Questions";
    question: Questions[] = [];
    base: string = "";
    
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl) {
        this.base = baseUrl+ "Question";
        this.getQuestions();
      }

      getQuestions(){
          this.http.get<Questions[]>(this.base)
          .subscribe(qList => {
              this.question = qList;
              console.log(qList)
          })
      }
}
