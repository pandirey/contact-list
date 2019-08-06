import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarCollapsed = true;

  constructor() {
    window.onresize = () => this.navBarCollapsed = true;
   }

  ngOnInit() {
  }

  toggleNavBarCollapsing() {
    this.navBarCollapsed = !this.navBarCollapsed;
  }

}
