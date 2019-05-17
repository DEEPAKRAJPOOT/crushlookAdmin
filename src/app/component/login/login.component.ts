import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {JarwisService } from 'src/app/Services/jarwis.service';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder } from '@angular/forms'
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public form = {
      email:null,
      password:null
    }

    public error :null;
    public loginForm:FormGroup;

  constructor(
    private http:HttpClient,
    private jarwise:JarwisService,
    private router:Router,
    private formBuilder:FormBuilder,
    private Token:TokenService,
  

  ) { }

   formbuilder()
   {
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:['',Validators.required]
    })
   }

   get fd()
   {
     return this.loginForm.controls;
   }
  ngOnInit() {
    this.formbuilder();
    if(this.Token.isValid() === true)
    {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit()
  {
    
    this.jarwise.login(this.loginForm.value).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
  }

  handleResponse(data){
    if(data.status !== 200)
    {
      this.error = data.message;
    }else{
      console.log(data.data);
      let checkToken = this.Token.handle(data.data.token);
      this.router.navigate(['/dashboard']);

    }
    console.log(data);
  }

  handleError(error){
    console.log(error);
    this.error = error.error.error;
  }



}
