import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('content') content;
  modalRef: NgbModalRef;

  formNew;

  constructor(
    private modal: NgbModal,
    private postsService: PostsService,
    private router: Router
  ) {
    this.formNew = new FormGroup({
      title: new FormControl('', [Validators.required]),
      main_image: new FormControl('', [Validators.required]),
      keywords: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }


  condition(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'password-forgotten', size: 'l', centered: true });
    }
  }

  createPost(): void {
    if (this.formNew.valid) {
      const newPost = { ...this.formNew.value }
      this.postsService.createPost(newPost).then(res => {
        this.router.navigate(['/blog/general']);
      }).catch(res => {
        alert('Su post no ha podido ser publicado');
      });
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.formNew.controls).forEach(field => {
        const control = this.formNew.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }

  }
}

