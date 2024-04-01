import { AxiosResponse } from "axios";
import { Observable, map, of } from "rxjs";
import { MVGDepature } from "./mvg.api";

export interface IDepartureAPI {
    getDepartures(stationId: string): Observable<AxiosResponse<MVGDepature[]>>;
}

export interface IDeparture {
    direction: string;
    transportIdentifier: string;
    departureTime: number;
    realDepartureTime: number;
    delayInMinutes: number;
}

export class DepartureHandler {
    constructor(private readonly api: IDepartureAPI) {}

    getDepartures(stationId: string, direction: string): Observable<IDeparture[]> {
        return this.api.getDepartures(stationId).pipe(
            map(response => {
                if (response.status === 200) return response.data;
                throw new Error(`Error while fetching departures ${response.status}, ${response.data}`);
            }),
            map(data => data.filter(dep => dep.destination === direction)),
            map(data => data.map(dep => ({
                direction: dep.destination,
                transportIdentifier: dep.label,
                departureTime: dep.plannedDepartureTime,
                realDepartureTime: dep.realtimeDepartureTime,
                delayInMinutes: dep.delayInMinutes
            }))),
        );
    }
}