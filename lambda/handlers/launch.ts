import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { generateAlexaNextDeparture } from "../views/handle-next-departure";
import { STATION_ID, TIMEZONE } from "../constants";
import { catchError, lastValueFrom, map, of } from "rxjs";

export const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response | Promise<Response> {
        return lastValueFrom(
            generateAlexaNextDeparture({
                stationId: STATION_ID,
                tz: TIMEZONE
            }).pipe(
                map((speechText) => {
                    return handlerInput.responseBuilder
                        .speak(speechText)
                        .withSimpleCard('Siguiente trenes', speechText)
                        .withShouldEndSession(true)
                        .getResponse();
                }),
                catchError((err) => {
                    return of(
                        handlerInput.responseBuilder
                            .speak(`Un error ha ocurrido: ${err.message}`)
                            .withShouldEndSession(true)
                            .getResponse()
                    );
                })
            )
        )
    },
};