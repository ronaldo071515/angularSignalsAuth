import { Component, inject, computed, effect } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStatus } from './auth/interfaces';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';
  
  private authService = inject(AuthService);
  private router = inject(Router)

  public finishedAuthCheck = computed<boolean>( () => {
    if( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  //Effect
  public authStatusChangedEffect = effect( () => {

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  });

}
