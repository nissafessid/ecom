import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiloginService } from 'src/app/services/apilogin.service';
import { ApiorderService } from 'src/app/services/apiorder.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @ViewChild('htmlData') htmlData:ElementRef;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listorders:any
  profileForm: FormGroup;
  submitted=false
  //term_search:any=""
  p:number=1
  constructor(private formBuilder: FormBuilder,private apidata:ApiloginService, 
    private modalService: NgbModal,private route: Router,private apidata1:ApiorderService,
    private apiService:ApiorderService) { }
    email= JSON.parse(localStorage.getItem("userconnect")!).email
  ngOnInit(): void {
    this.getAllorders()
    this.profileForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      //password: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      cin: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required]





     
  });
  console.log(this.userconnect)
  }


 

  get f() { return this.profileForm.controls; }

 
  getAllorders(){
    this.apiService.getcart(this.email).subscribe((res:any)=>{
      this.listorders=res["data"]
      console.log("reponse fffff",this.listorders)
    })
  }

  open(content:any) {
    this.profileForm.patchValue({
      _id:this.userconnect._id,

      email:this.userconnect.email,
     // password:this.userconnect.password,
      name:this.userconnect.name,
      cin:this.userconnect.cin,
      phone:this.userconnect.phone,
      role:this.userconnect.role,
      adress:this.userconnect.adress,
      city:this.userconnect.city
    })

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }


  updateuser(){
    this.apidata.updateuser(this.profileForm.value._id,this.profileForm.value).subscribe(res=>{
      console.log(res,"update user")
      Swal.fire(
        'User UPDATE!',
        'Your user has been updated.',
        'success'
      )

      this.apidata.login(this.userconnect.value)
      this.route.navigateByUrl('/login')
      //this.getAllusers()
     })
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  public openPDF():void {
    let DATA = document.getElementById('htmlData')!;
        
    html2canvas(DATA).then((canvas) => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('facture.pdf');
    });     
    }



  // getorder(email:any) {
  //   this.apiService.getcart(email).subscribe(
  //     data => {
  //       console.log('reponse',data)
  //     },
  //     err => {
  //      console.log('erreur')
  //     }
  //   );
  // }

}
