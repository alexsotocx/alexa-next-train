import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { MVGService } from "../services/mvg.api";
import { HttpService } from "../services/http.service";
import axios from "axios";
import { MVGDepartureAdapter } from "../services/departure.handler";
import { createAlexaResponseDeparture } from "../views/next-train.view";
import { lastValueFrom, map } from "rxjs";

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
            baseURL: 'https://www.mvg.de/api/fib/v2/',
        })));

        const departureHandler = new MVGDepartureAdapter(mvgService);
        const departuresObservable = departureHandler.getDepartures(aubingStationId, ['Flughafen München', 'Ostbahnhof', 'Hauptbahnhof']);

        return lastValueFrom(departuresObservable.pipe(
            map(departures => createAlexaResponseDeparture(departures, timezone)),
            map((speechText) => {
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard('Siguiente tren', speechText)
                    .getResponse();
            })
        ));
    },
};