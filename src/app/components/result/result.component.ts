import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from 'src/app/models/question.model';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  testId: string;
  timesRepeated: string;
  testResult: TestResult;
  testTimeMinutes: number;
  testTimeSeconds: number;


  constructor(
    private testService: TestsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.testId = this.activatedRoute.snapshot.paramMap.get('testId');
    this.timesRepeated = this.activatedRoute.snapshot.paramMap.get('timesRepeated');
  }

  ngOnInit(): void {
    this.testService.getTestResult(this.testId, this.timesRepeated).then(res => {
      this.testResult = res;

      const testTime = Date.parse(res.end_date) - Date.parse(res.init_date);

      this.testTimeMinutes = Math.floor(testTime / 60000);
      this.testTimeSeconds = Math.floor(((testTime % 60000) / 1000));

      if (this.testTimeSeconds === 60) {
        this.testTimeMinutes = this.testTimeMinutes + 1;
        this.testTimeSeconds = 0;
      }
    });
  }

}
