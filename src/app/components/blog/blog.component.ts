import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostsService } from 'src/app/services/posts.service';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, AfterViewInit {

  @ViewChild('blogSearchInput') blogSearchInput;

  generalPosts: Post[];
  hablandoPosts: Post[];

  blogType: string;

  blogSearchTerm: string;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService) {

    this.activatedRoute.params.subscribe(res => {
      this.blogType = res.type;
      // de inicio y al cambiar de tipo de blog de rellenan los dos arrays con todos los post
      this.postsService.getAllPosts(this.blogType)
        .then(response => {
          this.blogSearchTerm = '';
          this.generalPosts = response;
          this.hablandoPosts = response;
        })
        .catch(error => console.log(error));
    });

    this.blogType = this.activatedRoute.snapshot.paramMap.get('type');
  }

  ngOnInit(): void { }

  // eventos que han de ocurrir despues de que se renderice la página para que el view child tenga valor
  ngAfterViewInit(): void {

    // busqueda de blogs generales
    if (this.blogType.includes('general')) {
      // tslint:disable-next-line: max-line-length
      // escucha al input y le pone unos modificadores para evitar que se lance constantemente (debounce) y para que solo se lance con 2 caracteres
      fromEvent(this.blogSearchInput.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value), filter(res => res.length > 2), debounceTime(500)).subscribe((text) => {
          this.searchService.search(text, 1, null).then((res) => {
            this.generalPosts = res.generalPosts;
          }, (err) => {
            console.log('error', err);
          });
        });

      // busqeuda de blogs de hablando de política
    } else if (this.blogType.includes('hablando')) {
      // tslint:disable-next-line: max-line-length
      // escucha al input y le pone unos modificadores para evitar que se lance constantemente (debounce) y para que solo se lance con 2 caracteres
      fromEvent(this.blogSearchInput.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value), filter(res => res.length > 2), debounceTime(500)).subscribe((text) => {
          this.searchService.search(text, 2, null).then((res) => {
            this.hablandoPosts = res.hablandoPosts;
          }, (err) => {
            console.log('error', err);
          });

        });
    }
  }
}
