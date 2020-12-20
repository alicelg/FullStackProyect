import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, TestResult } from '../models/question.model';


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

  setAnswers(testId, answersArray, initDate): Promise<TestResult> {
    return this.httpClient.post<TestResult>(`${this.baseUrl}/answers`, { testId, answersArray, initDate }).toPromise();
  }

  getTestResult(testId, timesRepeated): Promise<TestResult> {
    return this.httpClient.get<TestResult>(`${this.baseUrl}/${testId}/result`, { params: { timesRepeated } }).toPromise();
  }
}
