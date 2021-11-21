import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <app-header></app-header>
    <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

}
