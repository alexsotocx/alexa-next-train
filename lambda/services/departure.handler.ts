import { Observable, map, of, throwError, timeout } from "rxjs";
import { IMVGAPI } from "./mvg.api";

export interface IDeparture {
    direction: string;
    transportIdentifier: string;
    departureTime: number;
    realDepartureTime: number;
    delayInMinutes: number;
}

export class MVGDepartureAdapter {
    constructor(private readonly api: IMVGAPI) {}

    getDepartures(stationId: string, direction: string[]): Observable<IDeparture[]> {
        return this.api.getDepartures(stationId).pipe(
            map(response => {
                if (response.status === 200) return response.data;
                throw new Error(`Error while fetching departures ${response.status}, ${response.data}`);
            }),
            map(data => data.filter(dep => direction.includes(dep.destination))),
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