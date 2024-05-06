import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  successMessage!: string | null;
  errorMessage!: string | null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    console.log(this.contactForm.value)
    this.http.post<any>('http://127.0.0.1:8000/contact', this.contactForm.value)
      .subscribe(
        response => {
          this.successMessage = 'Your message has been sent successfully.';
          this.errorMessage = null;
          this.contactForm.reset();
          this.submitted = false;
        },
        error => {
          this.errorMessage = 'An error occurred while sending your message. Please try again later.';
          this.successMessage = null;
        }
      );
  }
}
