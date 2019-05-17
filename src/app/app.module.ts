import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { PostmanagementComponent } from './component/postmanagement/postmanagement.component';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { JarwisService } from './Services/jarwis.service';
import { AuthGuard } from './auth.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchFilterPipe } from './search-filter.pipe'; 
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {ToastaModule} from 'ngx-toasta';
import { LandingComponent } from './component/landing/landing.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PostmanagementComponent,
    SearchFilterPipe,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgHttpLoaderModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    }),
    ToastaModule.forRoot(),

    
  ],
  providers: [JarwisService,AuthGuard, {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
},{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
