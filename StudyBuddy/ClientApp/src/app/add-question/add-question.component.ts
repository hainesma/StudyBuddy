import { Component, Inject, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Favorites } from "../favorites";
import { Questions } from '../questions';
import { QuestionService } from '../question.service';
import { NgForm } from '@angular/forms';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
  providers: [QuestionService, FavoriteService]
})

export class AddQuestionComponent {

  base: string = {} as string;
  qna: Questions = {} as Questions;
  @Input() text: string = {} as string;
  @Input() answer: string = {} as string;

  constructor(private http: HttpClient, private question: QuestionService, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl + 'Question';
    
  }

  addQuestion(form: NgForm) {
    form.form.value.text.replace('%20', ' ');
    form.form.value.answer.replace('%20', ' ');
    console.log(form.form.value.text);

    let quest: Questions = { id: null, text: form.form.value.text, answer: form.form.value.answer }

    if (quest.text !== null || quest.answer !== null) {

    this.http.post<Questions>(this.base + '/add/' + quest.text + '/' + quest.answer, quest)
      .subscribe(qList => {
        this.qna = qList;
        console.log(this.qna);
      })
    }
  }
}
