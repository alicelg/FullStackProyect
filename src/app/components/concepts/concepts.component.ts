import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Concept, ConceptsService } from 'src/app/services/concepts.service';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit, AfterViewInit {

  @ViewChild('conceptsSearchInput') conceptsSearchInput;

  concepts: Concept[];
  searchTerm: string;
  paginaActual: number;

  constructor(
    private conceptsService: ConceptsService,
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {
    this.searchTerm = this.activatedRoute.snapshot.queryParamMap.get('searchTerm');
    this.paginaActual = 0;
  }

  ngOnInit(): void { }

  // eventos que han de ocurrir despues de que se renderice la página para que el view child tenga valor
  ngAfterViewInit(): void {
    // si hay un termino de búsqueda (cuando viene preseleccionado desde la home) ñanza la búsqueda por ese valor
    if (this.searchTerm) {
      this.conceptsSearchInput.value = this.searchTerm;
      this.searchService.search(this.searchTerm, false, true, false).then((res) => {
        this.concepts = res.concepts;
      }, (err) => {
        console.log('error', err);
      });
      // si no hay termino preseleccionado lanza la busqueda de todos los conceptos
    } else {
      this.conceptsService.getConceptsByPage(this.paginaActual)
        .then(response => {
          this.concepts = response;
        })
        .catch(error => console.log(error));
    }

    // escucha al input y le pone unos modificadores para evitar que se lance constantemente (debounce) y para que solo se lance con 2 caracteres
    fromEvent(this.conceptsSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value), filter(res => res.length > 2), debounceTime(500)).subscribe((text) => {
        this.searchService.search(text, false, true, false).then((res) => {
          this.concepts = res.concepts;
        }, (err) => {
          console.log('error', err);
        });

      });
  }

  /* botones para paginación */

  prevPage() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    } else {
      this.paginaActual = 0
    }
    this.conceptsService.getConceptsByPage(this.paginaActual)
      .then(response => {
        this.concepts = response;
      })
      .catch(error => console.log(error));

  }

  /* consultar el limite a la base de datos  */

  nextPage() {
    if (this.paginaActual < 10) {
      this.paginaActual++;
    } else {
      this.paginaActual = 10
    }
    this.conceptsService.getConceptsByPage(this.paginaActual)
      .then(response => {
        this.concepts = response;
      })
      .catch(error => console.log(error));

  }

}
