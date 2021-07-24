import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicontactService } from 'src/app/services/apicontact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:ApicontactService) { }

  ngOnInit() {
      this.contactForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          message: ['', Validators.required],

         
         
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.contactForm.invalid) {
          return;
      }

      // display form values on success

      this.apidata.addcontact(this.contactForm.value).subscribe(res=>{
        Swal.fire(
          'added!',
          'Your contact has been added.',
          'success'
        )
        //this.route.navigateByUrl('/home/category')
       })
     
  }

  onReset() {
      this.submitted = false;
      this.contactForm.reset();
  }

}
