import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
  
    login(): Observable<boolean> {
      return of(true).pipe(
        tap(() => {
          this.isLoggedIn = true;
        })
      );
    }
  
    logout(): void {
      this.isLoggedIn = false;
    }
}
