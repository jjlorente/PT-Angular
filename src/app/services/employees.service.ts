import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

export interface User {
  id?: number;
  name: string;
  phone: string;
  mail: string;
  job: string;
}

@Injectable({providedIn: 'root'})

export class UsersService {
  private usersStore: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  readonly $users: Observable<User[]> = this.usersStore.asObservable();

  private userStore: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  readonly $user: Observable<User | null> = this.userStore.asObservable();

  constructor(private http: HttpClient) { }

  async getUsers() {
    try {
      const users = await this.http.get<User[]>(environment.apiUrl+'/users').toPromise();
      this.usersStore.next(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  

  getUser(userId: number) {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.get<User>(url).pipe(
      tap((user: User) => {
        this.userStore.next(user);
      }),
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        throw error;
      })
    );
  }
  
  
  deleteUser(userId: number) {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.delete<User>(url)
      .pipe(
        tap(() => {
          this.userStore.next(null);
        }),
        catchError(error => {
          console.error('Error al eliminar usuario:', error);
          throw error;
        })
      );
  }
  
  updateUser(user: User) {
    const url = `${environment.apiUrl}/users/${user.id}`;
    return this.http.put<User>(url, user).pipe(
        tap((user: User) => {
          this.userStore.next(user);
        }),
        catchError(error => {
          console.error('Error al actualizar usuario:', error);
          throw error;
        })
      );
  }
  
  addUser(user: User) {
    const url = `${environment.apiUrl}/users`;
    return this.http.post(url, user)
      .pipe(
        catchError(error => {
          console.error('Error al añadir usuario:', error);
          throw error;
        })
      );
  }
}