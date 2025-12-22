import {BehaviorSubject, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LOGIN, REGISTER} from "../data/backend-paths.data";
import {RegisterPayload} from "../data/register-payload.data";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly LOCAL_HOST_PATH = "http://localhost:8080";
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    return this.http.post<{ accessToken: string; username: string; roles: string[] }>(
      `${this.LOCAL_HOST_PATH}/${LOGIN}`,
      {username, password}
    ).pipe(tap(res => {
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('roles', JSON.stringify(res.roles));
      this.loggedIn$.next(true);
    }));
  }

  public logout() {
    localStorage.clear();
    this.loggedIn$.next(false);
  }

  public register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.LOCAL_HOST_PATH}/${REGISTER}`, payload);
  }

  public token() {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  public hasRole(role: string) {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
    return roles.includes(role);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
