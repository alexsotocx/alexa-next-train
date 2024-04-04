import { Observable, throwError, timeout } from "rxjs";
import axios, { AxiosResponse } from "axios";
import { HttpService } from "./http.service";

export interface MVGDepature {
    plannedDepartureTime: number,
    realtime: boolean,
    delayInMinutes: number,
    realtimeDepartureTime: number,
    transportType: 'SBAHN' | 'UBAHN' | 'TRAM' | 'BUS',
    label: string,
    divaId: string,
    network: string,
    trainType: string,
    destination: string,
    cancelled: boolean,
    sev: boolean,
    platform: number,
    platformChanged: boolean,
    messages: string[],
    bannerHash: string,
    occupancy: string,
    stopPointGlobalId: string,
}

export interface IMVGAPI {
    getDepartures(stationId: string): Observable<AxiosResponse<MVGDepature[]>>;
}

export class MVGService implements IMVGAPI {
    constructor(private readonly httpService: HttpService) { }

    getDepartures(stationId: string): Observable<AxiosResponse<MVGDepature[]>> {
        const searchParams = new URLSearchParams({
            globalId: stationId,
            limit: '5',
            transportTypes: 'SBAHN'
        })
        return this.httpService.get<MVGDepature[]>(`/departure`, {
            params: searchParams,
        }).pipe(timeout({
            each: 3000,
            with: () => throwError(() => new Error('Timeout while fetching departures')),
        }));
    }
}
