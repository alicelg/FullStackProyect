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
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value), filter(res => res.length > 2), debounceTime(500)).subscribe((text) => {
      this.searchService.search(text, [1, 2], 'all').then((res) => {
        this.searchResult = res;
      }, (err) => {
        console.log('error', err);
      });

    });
  }

}
