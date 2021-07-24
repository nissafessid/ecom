import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';
import { interval, Subscription } from 'rxjs';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import Swal from 'sweetalert2';
import { Constants } from '../constants/constants';

@Component({
  selector: 'app-categoryproduct',
  templateUrl: './categoryproduct.component.html',
  styleUrls: ['./categoryproduct.component.css']
})
export class CategoryproductComponent implements OnInit {

  filteredProducts :any= [];
  listproducts:any
  arrays:any=[]
  listcategorys:any
  productForm: FormGroup;
  categoryForm:FormGroup;
  submitted=false
  term_search:any=""
  p:number=1
  minValue = 0;
  maxValue = 3000;
  options: Options = {
    floor: 0,
    ceil: 3000
  };
  priceSelection: any;
  option: string;
  isBrowser: boolean;
  name:any

 
  // Filterdata: any = {};
  tempArray:any=[]
  newArray:any=[]
  private updateSubscription: Subscription;
  constructor(
  private formBuilder: FormBuilder,private apidata:ApiproductService,
     private modalService: NgbModal,
     private constants: Constants, private activeroute:ActivatedRoute) { 

      
     }

  ngOnInit(): void {
   this.name=this.activeroute.snapshot.params.name
    this.activeroute.params.subscribe(res=>{
      this.name=res.name 
      this.getAllproducts()
    })
  //  this.getAllproducts()
    this.getAllcategorys()
  //   this.productForm = this.formBuilder.group({
     
  //     _id: ['', Validators.required],

  //     name: ['', Validators.required],
  //     prix: ['', Validators.required],
  //     description: ['', Validators.required] 
  // });
  // this.categoryForm = this.formBuilder.group({
  //   checkArray: this.formBuilder.array([], [Validators.required]),
  // });
  
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.categoryForm.get('checkArray') as FormArray;
    
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.categoryForm.value) 
    const arr=checkArray
    this.tempArray=this.listproducts.filter((e:any)=>e.id_category._id==e.target.value);
    //    this.tempArray=this.arrays.filter((e:any)=>e._id==event.target.value);
    console.log( 'title',this.tempArray)
    //console.log('filtre types',this.listproducts.filter((el:any)=>checkArray.includes(el.id_category._id)))
  }



  getAllproducts(){
    this.apidata.getproducts().subscribe((res:any)=>{
       this.listproducts=res["date"].filter((e:any)=>e.id_category.title==this.name)
      console.log("productssssss", this.listproducts)
 

    })
    //this.changePrice()
    
  }


  OnChange(event: any){
    if(event.target.checked){
      console.log("detected value",event.target.value)
     this.tempArray=this.arrays.filter((e:any)=>e.id_category._id==event.target.value);
      console.log("temporaire" , this.tempArray)
     this.listproducts=[]
     this.newArray.push(this.tempArray)
     for(let i=0;i< this.newArray.length;i++){
       var firstArray=this.newArray[i];
       for(let i=0;i<firstArray.length;i++){
         var obj=firstArray[i];
         this.listproducts.push(obj)
         
       }
     }
     console.log(this.listproducts)
    }
    else{
     this.tempArray=this.arrays.filter((e:any)=>e.id_category._id!=event.target.value);
     this.newArray=[]
     this.arrays=[]
     this.newArray.push(this.tempArray)
      console.log('refreshh',this.newArray)
      this.getAllproducts()
      
    
    }
    }


 
   



  getAllcategorys(){
    this.apidata.getcategorys().subscribe((res:any)=>{
      this.listcategorys=res["date"]
      console.log("reponse",res)
    })
  }


  get f() { return this.productForm.controls; }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  


  

  




  // checked() {
  
  //   return this.listcategorys.filter(item => { return item.checked; });
  // }


  




 
  // checkboxFilter() {
  //     return function (arr,filter,key,noOne=false) {
  //         // arr is an array of objects
  //         // filter is checkbox filter. someting like {1:true,2:false}
  //         // key is a property in ech object inside arr
  //         // noOne is a behavior if none of checkbox is activated (default:false)
  //         if (!arr.length) return null;
  
  //         function noOneCheck(filter) {
  //             return Object.keys(filter).every((key) => {
  //                 return !filter[key]
  //             })
  //         }
  //         return arr.filter((i) => {
  //             return filter[i[key]] || (noOne && noOneCheck(filter))
  //         })
  //     }
  // };

//  this.filter('someFilter',checkboxFilter)

}



