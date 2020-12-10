import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';

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
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      console.log(text);
      // this.isSearching = true;
      this.searchService.search(text, [1, 2], 'all').then((res) => {
        console.log('res', res);
        this.searchResult = res;
        // this.isSearching = false;
        // this.apiResponse = res;
      }, (err) => {
        // this.isSearching = false;
        console.log('error', err);
      });

    });
  }

}
