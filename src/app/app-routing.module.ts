import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ForgetComponent } from './components/forget/forget.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistreComponent } from './components/registre/registre.component';
import { ResetComponent } from './components/reset/reset.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent, children:[

    {path:'',component:LayoutComponent},
    {path:'contact',component:ContactComponent},
    {path:'registre',component:RegistreComponent},
    {path:'product',component:ProductComponent},
    {path:'detailproduct/:id',component:DetailproductComponent},

  {path:'login',component:LoginComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'cart',component:CartComponent},
  {path:'forget',component:ForgetComponent},
  {path:'reset/:resetLink',component:ResetComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'category/:name',component:CategoryproductComponent},
  {path:'pdf',component:PdfComponent},
  {path:'dialog',component:ModalDialogComponent},

  







    


   

  


  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
