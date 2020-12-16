import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';

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
    private postsService: PostsService
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

  onSubmit() {

  }

  condition(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'password-forgotten', size: 'l', centered: true });
    }
  }

}
