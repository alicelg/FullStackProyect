import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Post[];
  blogType: string;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(res => {
      console.log(res);
      this.blogType = res.type;
      this.getAllPosts(res.type)
    })
  }

  ngOnInit(): void { }

  getAllPosts(type) {
    this.postsService.getAllPosts(type)
      .then(response => {
        this.posts = response;
      })
      .catch(error => console.log(error));
  }


  /* getAllPosts2(type) {
    this.postsService.getAllPosts2(type)
      .subscribe(response => {
        this.posts = response;
      }, error => {
        console.log(error);
      })
  } */


}
