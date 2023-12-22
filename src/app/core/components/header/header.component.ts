import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private tokenKey = 'TOKEN';
  isLogged!: boolean;
  isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLogged$;
    this.isLogged = this.auth.getToken(this.tokenKey) ? true : false;
  }

  onAddNewFaceSnap(): void {
    this.router.navigateByUrl('create');
  }

  onLogout(): void {
    this.auth.logout();
    this.isLogged = false;
    this.router.navigateByUrl('');
  }
}
