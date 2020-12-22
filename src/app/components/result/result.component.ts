import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from 'src/app/models/question.model';
import { TestsService } from 'src/app/services/tests.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

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
  politicalOrientation;

  public data: number[];

  // propiedades del grafico
  radarChartLabels: Label[];
  radarChartData: ChartDataSets[];
  radarChartOptions: RadialChartOptions;
  radarChartType: ChartType = 'radar';
  colors: Color[] = [{ backgroundColor: '#901b23dc', pointBackgroundColor: '#4d0707' }];


  constructor(
    private testService: TestsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.testId = this.activatedRoute.snapshot.paramMap.get('testId');
    this.timesRepeated = this.activatedRoute.snapshot.paramMap.get('timesRepeated');
  }

  ngOnInit(): void {
    this.testService.getTestResult(this.testId, this.timesRepeated).then(res => {
      // asignamos la respuesta a una variable pública para aceder a ella desde el html
      this.testResult = res;

      // calculamos el tiempo total del test y lo traducimos a minutos y segundos
      const testTime = Date.parse(res.end_date) - Date.parse(res.init_date);

      this.testTimeMinutes = Math.floor(testTime / 60000);
      this.testTimeSeconds = Math.floor(((testTime % 60000) / 1000));

      if (this.testTimeSeconds === 60) {
        this.testTimeMinutes = this.testTimeMinutes + 1;
        this.testTimeSeconds = 0;
      }

      // si el test es de orientación política
      if (this.testResult.test_id === 2) {
        // formateamos la respuesta como un json accesible
        this.politicalOrientation = JSON.parse(this.testResult.political_orientation);

        // extraemos el numero total de preguntas antes de eliminar la propiedad para que no se pinte
        const totalQuestions = this.politicalOrientation.total;
        delete this.politicalOrientation.total;

        // extraemos un array con los datos de cada una de las propiedades en procentaje
        this.data = Object.keys(this.politicalOrientation)
          .map(key => (this.politicalOrientation[key] / totalQuestions) * 100);

        // pasamos los valores y las etiquetas de los mismos al gráfico
        this.radarChartData = [{ data: this.data }];
        this.radarChartLabels = Object.keys(this.politicalOrientation);

        // configuramos las opciones del gráfico
        this.radarChartOptions = {
          responsive: true,
          legend: { display: false },
          tooltips: { enabled: false },
          scale: {
            pointLabels: {
              callback: (pointLabel) => pointLabel + ' ' + this.data[this.radarChartLabels.findIndex(x => x === pointLabel)] + '%',
              fontColor: '#4d0707',
              fontSize: 16,
            },
            angleLines: { color: '#d3d3d3', lineWidth: 2 },
            gridLines: { color: '#d3d3d3', lineWidth: 3 },
            ticks: {
              display: true,
              // maxTicksLimit: 1,
              stepSize: 10,
              suggestedMin: 0,
              // suggestedMax: 100
            }
          }
        };
      }
    });
  }

}
