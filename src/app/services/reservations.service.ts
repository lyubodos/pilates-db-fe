import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserData} from "../data/userData";
import {Observable, of} from "rxjs";
import {
  DELETE_RESERVATION,
  DELETE_USER,
  RESERVATIONS_LIST,
  RESERVATIONS_LIST_ALL,
  SAVE_USER
} from "../data/backend-paths.data";
import {ReservationSlot} from "../data/reservation-slot.data";

@Injectable({
  providedIn: "root"
})
export class ReservationsService {
  private readonly LOCAL_HOST_PATH = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(): Observable<UserData[]> {
    return this.httpClient
      .get<UserData[]>(`${this.LOCAL_HOST_PATH}/${RESERVATIONS_LIST}`)
  }

  public getReservations(): Observable<ReservationSlot[]> {
    return this.httpClient
      .get<ReservationSlot[]>(`${this.LOCAL_HOST_PATH}/${RESERVATIONS_LIST_ALL}`)
  }

  public onSaveUser(userData: any): Observable<UserData> {
    return this.httpClient.post<UserData>(`${this.LOCAL_HOST_PATH}/${SAVE_USER}`, userData);
  }

  public onDeleteUser(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.LOCAL_HOST_PATH}/${DELETE_USER}`, id);
  }

  public onDeleteReservation(id : number): Observable<void> {
    return this.httpClient.post<void>(`${this.LOCAL_HOST_PATH}/${DELETE_RESERVATION}`, id);
  }

  public onBookReservation(id : number): Observable<void> {
    return this.httpClient.post<void>(`${this.LOCAL_HOST_PATH}/reservations/${id}/reserve`, {});
  }

  public onCancelReservation(id : number): Observable<void> {
    return this.httpClient.post<void>(`${this.LOCAL_HOST_PATH}/reservations/${id}/cancel`, {});
  }


}
