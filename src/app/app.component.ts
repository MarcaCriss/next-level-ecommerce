import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ngx-spinner
      bdColor="#fff"
      size="medium"
      color="#dd0031"
      type="ball-scale-multiple"
    ></ngx-spinner>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'next-level-ecommerce';
}
