import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMenu : Boolean;

  constructor(
    private router:Router,
    private token:TokenService,
    private jarwise:JarwisService
  ) { }

  ngOnInit() {
    this.showMenu = false;
  }

  showmenu() {
    this.showMenu = !this.showMenu;
    const body = document.getElementById('CrushLookApp');
    if(this.showMenu) {
      body.classList.add('test')
    }
    else {
      body.classList.remove('test')
    }
  }

  logout(event: MouseEvent){

    event.preventDefault();
    this.token.remove();
    this.router.navigateByUrl('/login');
  }

}
