import { Observable } from "rxjs";
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

export class MVGService {
    constructor(private readonly httpService: HttpService) {}

    getDepartures(stationId: string): Observable<AxiosResponse<MVGDepature[]>> {
        return this.httpService.get<MVGDepature[]>(`/location/queryWeb?q=${stationId}`);
    }
}
