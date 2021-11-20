import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/auth/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login']);
  }

}
