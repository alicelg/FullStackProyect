import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('content') content;
  modalRef: NgbModalRef;

  constructor(
    private modal: NgbModal,
  ) { }

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
