import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput;
  searchResult: any;

  constructor(
    public translateService: TranslateService,
    private searchService: SearchService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: max-line-length
    // añadimos un "listener" al elemento traido por viewchild para obtener un observable que podamos modificar con operadores rxjs (debounce y demas)
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value), filter(res => res.length > 2), debounceTime(500)).subscribe((text) => {
      this.searchService.search(text, [1, 2], true, true).then((res) => {
        this.searchResult = res;
      }, (err) => {
        console.log('error', err);
      });

    });
  }

}
