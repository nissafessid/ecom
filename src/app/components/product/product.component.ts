import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import Swal from 'sweetalert2';
import { Options } from 'ng5-slider';
import { Constants } from '../constants/constants';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
  page=this.activeroute.snapshot.params.page
  color_selectione=""

 
  // Filterdata: any = {};
  tempArray:any=[]
  newArray:any=[]
 
  constructor(@Inject(PLATFORM_ID) platformId: Object,
  private formBuilder: FormBuilder,private apidata:ApiproductService,
     private modalService: NgbModal,
     private constants: Constants,
     private activeroute:ActivatedRoute) { 

      this.isBrowser = isPlatformBrowser(platformId);
      console.log('plateforme de travail',this.isBrowser)
     }

  ngOnInit(): void {
   
    this.getAllproducts()
    this.getAllcategorys()
    // this.getpage()
    this.productForm = this.formBuilder.group({
     
      _id: ['', Validators.required],

      name: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required] 
  });
  this.categoryForm = this.formBuilder.group({
    checkArray: this.formBuilder.array([], [Validators.required]),
  });
  
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









//   SliderChange(val: any) {  
//     this. Filterdata = this.listproducts.filter((obj:any )=> obj.prix >= val.lower && obj.prix <= val.upper);
//     console.log(this.Filterdata)
// }

changePrice() {
  console.log('Price change', this.priceSelection);
  let event = this.priceSelection
  this.apidata.getproducts().subscribe((res:any)=>{
    this.listproducts=res["date"]
    if (event !== undefined) {
      const ListproduitByPrice = this.listproducts.filter((elemt: any) => elemt.prix >= event[0] && elemt.prix <= event[1]);
      this.listproducts = ListproduitByPrice;
      console.log('filter by price', this.listproducts)
     
    }
  })
}
  


  getAllproducts(){
    this.apidata.getproducts().subscribe((res:any)=>{
      this.listproducts=res["date"]
      this.arrays=res["date"]
      console.log("reponse",res)
      console.log(this.arrays)   
    })
    //this.changePrice()
    
  }
  getpage(event:any){

      this.apidata.getproducts1(this.page).subscribe((res:any)=>{
        this.listproducts=res["date"]
        console.log('product in page',this.listproducts)
  
      })
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


    sortbyMessage(event:any): void {
      this.option = event.target.value;
        console.log("event",this.option)
      const SortBy = (x:any, y:any) => {
        if (this.option === this.constants.sortbyPrice_L2H) {
          return ((x.prix === y.prix) ? 0 : ((x.prix > y.prix[this.option]) ? 1 : -1));
        } else if (this.option === this.constants.sortbyPrice_H2L) {
          return ((x.prix === y.prix) ? 0 : ((x.prix > y.prix) ? -1 : 1));
        } else if (this.option === this.constants.sortbyPrice_NF) {
          return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
        } else {
          return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
        }
      };
        this.listproducts.sort(SortBy);
       console.log(this.listproducts)
    }
   



  getAllcategorys(){
    this.apidata.getcategorys().subscribe((res:any)=>{
      this.listcategorys=res["date"]
      console.log("reponse",res)
    })
  }


  get f() { return this.productForm.controls; }

  deleteproduct(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apidata.deleteproduct(id).subscribe(res=>{
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getAllproducts()
       })
      }
    })
  }



  open(content:any,product:any) {
    this.productForm.setValue({
      name:product.name,
      _id:product._id,

      description:product.description,
      prix:product.prix
    })

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }


  updateProduct(){
    this.apidata.updateproduct(this.productForm.value._id,this.productForm.value).subscribe(res=>{
      console.log(res,"update product")
      Swal.fire(
        'PRODUCT UPDATE!',
        'Your product has been updated.',
        'success'
      )

      this.getAllproducts()
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



  OnChangecolor(event:any){
   
      console.log("detected value color ",event.target.value)
      this.apidata.getproducts().subscribe((res:any)=>{
        this.listproducts=res["date"].filter((el:any)=>el.color==event.target.value)
        console.log("listeproduct color ",this.listproducts)
      } )

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
