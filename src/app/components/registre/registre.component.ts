import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiloginService } from 'src/app/services/apilogin.service';
import Swal from 'sweetalert2';
import { MustMatch } from '../utils/mismatch';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  RegisterForm: FormGroup;
  submitted = false;
  fileToUpload:Array<File>=[];
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:ApiloginService) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      cin: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required] 
    },
    {
      validator: MustMatch('password', 'confirmPassword')
  });  
 
  }
  get f() { return this.RegisterForm.controls; }


  handleFileInput(files: any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
  }

  onSubmit() {
    this.submitted = true;
    console.log("form validation",this.RegisterForm.value)

    // stop here if form is invalid
    if (this.RegisterForm.invalid) {
      console.log("err de validation",this.RegisterForm.value)
        return;
       
    }

    let formdata=new FormData();
    formdata.append("email",this.RegisterForm.value.email);
    formdata.append("password",this.RegisterForm.value.password);
    formdata.append("name",this.RegisterForm.value.name);
    formdata.append("phone",this.RegisterForm.value.phone);
    formdata.append("role",this.RegisterForm.value.role);
    formdata.append("cin",this.RegisterForm.value.cin);
    formdata.append("adress",this.RegisterForm.value.adress);
    formdata.append("city",this.RegisterForm.value.city);
     formdata.append("file",this.fileToUpload[0]);






    // display form values on success

    this.apidata.register(formdata).subscribe((res:any)=>{
      console.log(res)
  
     
       // this.route.navigateByUrl('/login')
        let datalogin={
          email:this.RegisterForm.value.email,
          password:this.RegisterForm.value.password
        }
       
       if(res.message==='customer added'){
        Swal.fire(
          'Customer added !',
          'success'
        )
        this.apidata.login(datalogin).subscribe((res:any)=>{
          console.log(res)
          if(res.message==='user found!!!'){
            //this.apidata.login(datalogin).subscribe(res)
           this.route.navigateByUrl('/profile')
           localStorage.setItem('userconnect',JSON.stringify(res['data'].user))
           localStorage.setItem('token',res['data'].token)
           localStorage.setItem('refreshtoken',res['data'].refreshtoken)
           localStorage.setItem("state","0")
            this.route.navigateByUrl('/profile')

           }
        })
       }
       else{
        Swal.fire({
          icon:'error',
          title:'user not found ',
          text:'email invalid',
          footer:'password invalid'
        })
      }
    })
  }
}
