import { Component, OnInit } from '@angular/core';
import { Concept, ConceptsService } from 'src/app/services/concepts.service';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  concepts: Concept[];

  constructor(private conceptsService: ConceptsService) { }

  ngOnInit(): void {

    this.conceptsService.getAll()
      .then(response => {
        this.concepts = response;
      })
      .catch(error => console.log(error));

  }

}
