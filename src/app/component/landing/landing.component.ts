import { Component, OnInit } from '@angular/core';
import {JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public totalCrush = 0;
  public newUsers = 0;
  public activeUser = 0;
  public allMatches=0;
  public error = null;

  constructor(
    private jarwise:JarwisService,
    private token:TokenService,
    private router:Router,
  ) { }


  ngOnInit() {

    this.jarwise.getDashboardGraphData().subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error),
    );
  }

  handleResponse(data)
  {
    //console.log(data);
    this.totalCrush = data.data.TotalCrush;
    this.newUsers = data.data.newUser;
    this.activeUser = data.data.ActiveUser;
    this.allMatches = data.data.allMatches;

    //console.log(this.totalCrush);
  }

  handleError(error)
  {
    this.error = error.error.error;
    this.token.remove();
    this.router.navigateByUrl('/login');
  }

}
