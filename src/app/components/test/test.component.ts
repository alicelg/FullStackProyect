import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TestsService } from 'src/app/services/tests.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  step: string;
  currentUser: User;
  testId: string;

  constructor(
    private userService: UsersService,
    private testService: TestsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.step = 'instructions';
    this.userService.currentUser.subscribe(res => {
      this.currentUser = res;
    });

    this.testId = this.activatedRoute.snapshot.paramMap.get('testId');
  }

  ngOnInit(): void {

    this.testService.getQuestionsByTest(this.testId).then(res => {
      console.log(res);

    });

  }

}
