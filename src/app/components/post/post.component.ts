import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { Post, Comment } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  postId;

  comment: Comment;

  currentUser: User;

  formComment;


  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
  ) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.currentUser = this.userService.isLogged;

    this.formComment = new FormGroup({
      text: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

    this.postsService.getPostById(this.postId)
      .then(response => {
        this.post = response
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

  deletePost(postId) {
    this.postsService.deletePost(postId);
  }

  createComment(): void {
    if (this.formComment.valid) {
      const newComment = { ...this.formComment.value }
      newComment.postId = this.postId;
      this.postsService.createComment(newComment);
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.formComment.controls).forEach(field => {
        const control = this.formComment.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


  editPost(postId) {
    this.postsService.editPost(postId);
  }
}
