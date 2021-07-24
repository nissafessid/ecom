import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiloginService } from 'src/app/services/apilogin.service';
import Swal from 'sweetalert2';
import { MustMatch } from '../utils/mismatch';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  resetLink=this.activeroute.snapshot.params.resetLink
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:ApiloginService,private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      newPass: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('newPass', 'confirmPassword')
    });
     
     
  
  }
  get f() { return this.resetForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
        return;
       
    }

    // display form values on success
 
    this.apidata.resetpassword(this.resetLink,this.resetForm.value).subscribe((res:any)=>{
      Swal.fire(
          
        'password has been changed.',
      
      )
      this.route.navigateByUrl('/login')
      console.log(res)
    
     
     
     })
   

}


}
