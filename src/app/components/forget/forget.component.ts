import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiloginService } from 'src/app/services/apilogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  forgetForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:ApiloginService) { }

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.required]
    
     
     
  });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetForm.invalid) {
        return;
       
    }

    // display form values on success
 
    this.apidata.forgetpassword(this.forgetForm.value).subscribe((res:any)=>{
      
        Swal.fire(
          
          'Email has been send.',
          'success'
        )
      console.log(this.forgetForm.value)
      this.route.navigateByUrl('/reset')
    
     
     
     })
   

}



}
