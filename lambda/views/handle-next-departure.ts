import { MVGDepartureAdapter } from "../services/departure.handler";
import { Response } from "ask-sdk-model";
import { MVGService } from "../services/mvg.api";
import { HttpService } from "../services/http.service";
import axios from "axios";

import { Observable,  map } from "rxjs";
import { formatDeparture } from "./next-train.view";


export function generateAlexaNextDeparture({ stationId, tz }: { stationId: string; tz: string; }): Observable<string> {
    const mvgService = new MVGService(new HttpService(axios.create({
        baseURL: 'https://www.mvg.de/api/fib/v2',
    })));

    const departureHandler = new MVGDepartureAdapter(mvgService);
    const departuresObservable = departureHandler.getDepartures(stationId);

    return departuresObservable.pipe(
        map(departures => departures.map((d) => formatDeparture(d, tz)).join('\n')),
    );
}
