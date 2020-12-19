import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  postId;


  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {

    this.postsService.getPostById(this.postId)
      .then(response => {
        this.post = response
        console.log(this.post);

      })
      .catch(error => console.log(error));

  }

  makeFavoritePost(pId) {
    this.postsService.insertFavorite(pId);
  }


}
