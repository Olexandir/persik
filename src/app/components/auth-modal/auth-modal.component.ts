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

  ngOnInit(): void {
    this.createAuthForm();
  }

  private createAuthForm(): void {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.authForm.valueChanges.subscribe((data) => console.log(data));
  }

  public closeModalWindow(): void {
    this.closeModalWindowChange.emit(false);
  }

  public logIn() {
    const userLoginData = this.authForm.getRawValue();
    console.log(userLoginData);
  }
}
