import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LOGIN, REGISTER} from "../data/backend-paths.data";
import {RegisterPayload} from "../data/register-payload.data";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {UserData} from "../data/userData";


type JwtPayload = { exp?: number };

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly LOCAL_HOST_PATH = "http://localhost:8080";
  private readonly TOKEN_KEY = 'access_token';
  private loggedIn$ = new BehaviorSubject<boolean>(true);
  private loggedInUser$ = new BehaviorSubject<string>("");
  private logoutTimerId: any = null;
  private userSubject = new BehaviorSubject<UserData | null>(null);

  public isAdmin$ = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {
  }

  setUser(user: UserData) {
    this.userSubject.next(user);
  }

  get isAdminRole(): boolean {
    console.log(this.userSubject.value?.roles);
    return this.userSubject.value?.roles.includes('ROLE_ADMIN') ?? false;
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.scheduleAutoLogoutFromToken(token);
  }

  loginSuccess(token: string) {
    const decoded: any = jwtDecode(token);

    const roles: string[] = decoded.roles ?? [];

    this.userSubject.next({
      id: decoded.sub,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      username: decoded.username,
      roles
    });
  }

  public login(username: string, password: string) {
    return this.http.post<{ accessToken: string; username: string; roles: string[], user: UserData }>(
      `${this.LOCAL_HOST_PATH}/${LOGIN}`,
      {username, password}
    ).pipe(tap(res => {
      // this.setToken(res.accessToken);
      this.setUser(res.user)
      this.loginSuccess(res.accessToken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('roles', JSON.stringify(res.roles));
      localStorage.setItem('isAdmin', JSON.stringify(res.roles.includes('ROLE_ADMIN')));
      this.loggedIn$.next(true);
      this.loggedInUser$.next(res.username);
    }));
  }

  public logout(reason: 'expired' | 'unauthorized' | 'manual' = 'manual') {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('isAdmin');

    if (this.logoutTimerId) {
      clearTimeout(this.logoutTimerId);
      this.logoutTimerId = null;
    }

    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  public register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.LOCAL_HOST_PATH}/${REGISTER}`, payload);
  }

  public restoreSession(): void {
    const token = this.getToken();
    if (!token) return;

    const remainingMs = this.getRemainingMs(token);
    if (remainingMs <= 0) {
      this.logout('expired');
      return;
    }

    this.scheduleAutoLogout(remainingMs);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public isAdmin(): string | null {
    return localStorage.getItem('isAdmin');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  public getLoggedInUser(): Observable<string | null> {
    return this.loggedInUser$;
  }

  public hasRole(role: string) {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
    return roles.includes(role);
  }

  private scheduleAutoLogoutFromToken(token: string) {
    const remainingMs = this.getRemainingMs(token);
    if (remainingMs <= 0) {
      this.logout('expired');
      return;
    }
    this.scheduleAutoLogout(remainingMs);
  }

  private scheduleAutoLogout(ms: number) {
    if (this.logoutTimerId) clearTimeout(this.logoutTimerId);

    this.logoutTimerId = setTimeout(() => {
      this.logout('expired');
    }, ms);
  }

  private getRemainingMs(token: string): number {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expSec = decoded.exp;
      if (!expSec) return 0;

      const expMs = expSec * 1000;
      return expMs - Date.now();
    } catch {
      return 0;
    }
  }

  private hasToken(): boolean {
    return true;
  }
}
