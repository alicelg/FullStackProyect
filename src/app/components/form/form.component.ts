import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('content') content;
  modalRef: NgbModalRef;

  formNew;
  action: string;
  postToEdit: Post;

  constructor(
    private modal: NgbModal,
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.formNew = new FormGroup({
      title: new FormControl('', [Validators.required]),
      main_image: new FormControl('', [Validators.required]),
      keywords: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
    })

    if (location.href.includes('edicion')) {
      this.action = 'EDIT';
      this.postToEdit = JSON.parse(localStorage.getItem('post'));

      this.formNew.controls.title.value = this.postToEdit.title;
      this.formNew.controls.main_image.value = this.postToEdit.main_image;
      this.formNew.controls.keywords.value = this.postToEdit.keywords;
      // this.formNew.controls.category.value = this.postToEdit.category;
      console.log(document.getElementsByTagName('option'));
      Array.from(document.getElementsByTagName('option')).forEach(option => {

        if (option.value == this.postToEdit.category) {
          option.selected = true
        }
      })
      this.formNew.controls.summary.value = this.postToEdit.summary;
      this.formNew.controls.text.value = this.postToEdit.text;

    } else {
      this.action = 'CREATE';
    }
  }

  ngOnInit(): void { }

  condition(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'password-forgotten', size: 'l', centered: true });
    }
  }

  createPost(): void {
    alert('create');
    if (this.formNew.valid) {
      this.postsService.createPost(this.formNew.value).then(res => {
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

  editPost(): void {
    alert('edito');
    // hacemos una copia del valor del formulario despues de editar para añadir el id del post
    const postEdited: Post = { ...this.formNew.value };
    postEdited.id = Number(this.activatedRoute.snapshot.paramMap.get('postId'))


    if (this.formNew.valid) {
      this.postsService.editPost(postEdited).then(res => {
        this.router.navigate(['/blog/general/', postEdited.id]);
      }).catch(res => {
        alert('Su post no ha podido ser editado');
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

