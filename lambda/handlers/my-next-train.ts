import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { MVGService } from "../services/mvg.api";
import { HttpService } from "../services/http.service";
import axios from "axios";
import { MVGDepartureAdapter } from "../services/departure.handler";
import { formatDeparture } from "../views/next-train.view";
import { catchError, lastValueFrom, map, of } from "rxjs";

const aubingStationId = 'de:09162:1730';
const timezone = 'Europe/Berlin';

export const MyNextTrainHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'MyNextTrain';
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
        const mvgService = new MVGService(new HttpService(axios.create({
            baseURL: 'https://www.mvg.de/api/fib/v2',
        })));

        const departureHandler = new MVGDepartureAdapter(mvgService);
        const departuresObservable = departureHandler.getDepartures(aubingStationId);

        return lastValueFrom(departuresObservable.pipe(
            map(departures => departures.map((d) => formatDeparture(d, timezone)).join('\n')),
            map((speechText) => {
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard('Siguiente trenes', speechText)
                    .getResponse();
            }),
            catchError((err) => {
                return of(
                    handlerInput.responseBuilder
                    .speak(`Un error ha ocurrido: ${err.message}`)
                    .getResponse()
                )
            })
        ));
    },
};