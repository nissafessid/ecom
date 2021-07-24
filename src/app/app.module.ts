import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistreComponent } from './components/registre/registre.component';
import { ProductComponent } from './components/product/product.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { PipesPipe } from './pipes.pipe';
import { RecherchePipe } from './pipes/recherche.pipe';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { Constants } from './components/constants/constants';
import { CartdetailComponent } from './components/cartdetail/cartdetail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartpriceComponent } from './components/cartprice/cartprice.component';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { QuantityproductDirective } from './quantityproduct.directive';
import { ModalDirective } from './modal.directive';
import { ModalnewDirective } from './modalnew.directive';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ComponentLoaderServiceService } from './services/component-loader-service.service';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AuthInterceptor } from './interceptors/auth.interceptor';






@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    ContactComponent,
    RegistreComponent,
    ProductComponent,
    DetailproductComponent,
    ProfileComponent,
    CartComponent,
    ForgetComponent,
    ResetComponent,
    PipesPipe,
    RecherchePipe,
    CartdetailComponent,
    CheckoutComponent,
    CartpriceComponent,
    CategoryproductComponent,
    PdfComponent,
    QuantityproductDirective,
    ModalDirective,
    ModalnewDirective,
    ModalDialogComponent,
    
    
   
 
 
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    Ng5SliderModule,
    NgxPaginationModule,
  ToastNotificationsModule
 

  ],
  providers: [Constants,ComponentLoaderServiceService,
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
