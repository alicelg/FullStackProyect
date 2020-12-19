import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { Post, Comment } from 'src/app/models/post.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  @ViewChild('content') content;
  modalRef: NgbModalRef;

  post: Post;
  postId;

  comment: Comment;

  currentUser: User;

  formComment;


  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private modal: NgbModal
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
      .catch(error => this.router.navigate(['/blog/general']));
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

  showDeleteModal(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'delete-post', size: 'l', centered: true });
    }
  }

  deletePost() {
    this.postsService.deletePost(this.postId).then(res => {
      this.router.navigate(['/blog/general']);
    });
  }

  createComment(): void {
    if (this.formComment.valid) {
      const newComment = { ...this.formComment.value }
      newComment.postId = this.postId;
      this.postsService.createComment(newComment);
      this.ngOnInit();

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
