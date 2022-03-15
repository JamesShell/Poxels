import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const navLinks = document.getElementById('navlinks');

    function showMenu(){
      if(navLinks){
        navLinks.style.right = "0";
      }
    }
    function hideMenu(){
      if(navLinks){
        navLinks.style.right = "-200px";
      }
    }
  }

}
