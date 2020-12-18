import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { User } from 'src/app/models/user.model';
import { Post, PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  postId;

  currentUser: User;


  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
  ) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.currentUser = this.userService.isLogged;

  }

  ngOnInit(): void {

    this.postsService.getPostById(this.postId)
      .then(response => {
        this.post = response
        console.log(this.post);

      })
      .catch(error => console.log(error));

  }


  toggleFavorite(element, postId) {
    console.log(element.classList);

    if (element.classList.contains('heart-empty')) {
      element.classList.remove('heart-empty')
      element.classList.add('heart-full')

      this.postsService.insertFavorite(postId);
    } else {
      element.classList.remove('heart-full')
      element.classList.add('heart-empty')
      this.postsService.deleteFavorite(postId);
    }

  }



}
