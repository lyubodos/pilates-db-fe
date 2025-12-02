import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserData} from "../data/userData";
import {Observable, of} from "rxjs";
import {DELETE_USER, RESERVATIONS_LIST, SAVE_USER} from "../data/backend-paths.data";

@Injectable({
  providedIn: "root"
})
export class ReservationsService {
  private readonly LOCAL_HOST_PATH = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  public getReservations(): Observable<UserData[]> {
    return this.httpClient
      .get<UserData[]>(`${this.LOCAL_HOST_PATH}/${RESERVATIONS_LIST}`)
  }

  public onSave(userData: any): Observable<UserData> {
    return this.httpClient.post<UserData>(`${this.LOCAL_HOST_PATH}/${SAVE_USER}`, userData);
  }

  public onDeleteReservation(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.LOCAL_HOST_PATH}/${DELETE_USER}`, id);
  }

}
