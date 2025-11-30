import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReservationData} from "../data/reservation.data";
import {Observable} from "rxjs";
import {RESERVATIONS_LIST} from "../data/backend-paths.data";

@Injectable({
  providedIn: "root"
})
export class ReservationsService {
    private readonly LOCAL_HOST_PATH = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {
    }

    public getReservations() : Observable<ReservationData[]> {
      return this.httpClient
        .get<ReservationData[]>(`${this.LOCAL_HOST_PATH}/${RESERVATIONS_LIST}`)
   }

}
