import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Questions } from "./questions";

@Injectable({
    providedIn: 'root'
  })

export class QuestionService{
    constructor(private http: HttpClient) {
}


getQuestions(@Inject('BASE_URL') baseUrl: string): any{
    return this.http.get<Questions[]>(baseUrl + 'Question');
}
}
