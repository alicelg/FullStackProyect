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

  answersArray: any[];
  initDate: Date;


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

  ngOnInit(): void { }

  startTest(): void {

    this.testService.getQuestionsByTest(this.testId).then(res => {
      // definimos el array de preguntas completo
      this.allQuestions = res;

      // marcamos como primera pregunta la 0 del array
      this.actualQuestion = this.allQuestions[this.questionNumber];

      // mostramos la imagen de la bandera que corresponda
      this.svg = this.sanitizer.bypassSecurityTrustHtml(this.actualQuestion.image);

      // obtenemos la fecha de inicio del test
      this.initDate = new Date();

      // mostramos las preguntas
      this.action = 'questions';
    });

  }

  questionAnswered(questionId, answerId): void {
    // preparamos los datos a insertar en la bbdd
    const dateFormat = this.initDate.toISOString().split('T')[0] + ' ' + this.initDate.toTimeString().split(' ')[0];
    const answer = [this.testId, questionId, answerId];

    // añadimos la respuesta a un array
    this.answersArray.push(answer);

    // si no estamos en la ultima pregunta seguimos montrando la siguiente
    if (this.questionNumber < this.allQuestions.length - 1) {
      this.nextQuestion();
      // si estamos en la última pregunta enviamos el array de respuestas
    } else {
      this.testService.setAnswers(this.testId, this.answersArray, dateFormat).then(res => {
        console.log(res);
      });
    }

  }

  nextQuestion(): void {
    this.questionNumber++;
    this.actualQuestion = this.allQuestions[this.questionNumber];
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.actualQuestion.image);
  }
}
