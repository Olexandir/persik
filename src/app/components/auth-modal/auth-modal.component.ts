import { Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  @Output() closeModalWindowChange = new EventEmitter<boolean>();

  public authForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  createAuthForm() {
    this.authForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  closeModalWindow() {
    this.closeModalWindowChange.emit(false);
  }
}
