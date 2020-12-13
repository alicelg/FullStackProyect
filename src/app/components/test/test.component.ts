import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Answer, Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { TestsService } from 'src/app/services/tests.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  action: string;
  currentUser: User;
  testId: string;

  allQuestions: Question[];
  actualQuestion: Question;

  questionNumber: number;

  svg: SafeHtml;

  answersArray: Answer[];


  constructor(
    private userService: UsersService,
    private testService: TestsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    this.action = 'instructions';

    this.userService.currentUser.subscribe(res => {
      this.currentUser = res;
    });

    this.answersArray = [];

    this.testId = this.activatedRoute.snapshot.paramMap.get('testId');
    this.questionNumber = 0;
  }

  ngOnInit(): void {
    this.testService.getQuestionsByTest(this.testId).then(res => {
      console.log(res);
      this.allQuestions = res;
      this.actualQuestion = this.allQuestions[this.questionNumber];
      this.svg = this.sanitizer.bypassSecurityTrustHtml(this.actualQuestion.image);
    });

  }

  questionAnswered(questionId, answerId): void {
    const answer = new Answer();
    answer.questionId = questionId;
    answer.answerId = answerId;

    this.answersArray.push(answer);

    if (this.questionNumber < this.allQuestions.length - 1) {
      this.nextQuestion();
    } else {
      console.log(this.answersArray);
      this.testService.setAnswers(this.testId, this.answersArray).then(res => {
        console.log(res);

      })
    }

  }

  nextQuestion(): void {
    this.questionNumber++;
    this.actualQuestion = this.allQuestions[this.questionNumber];
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.actualQuestion.image);
  }
}
