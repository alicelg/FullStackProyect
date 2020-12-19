import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';


@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/tests';
  }

  getQuestionsByTest(testId): Promise<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseUrl}/${testId}/questions`).toPromise();
  }

  setAnswers(testId, answersArray, initDate): Promise<Question[]> {
    return this.httpClient.post<Question[]>(`${this.baseUrl}/answers`, {testId, answersArray, initDate}).toPromise();
  }
}
