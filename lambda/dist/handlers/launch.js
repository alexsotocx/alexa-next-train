"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchRequestHandler = void 0;
const handle_next_departure_1 = require("../views/handle-next-departure");
const constants_1 = require("../constants");
const rxjs_1 = require("rxjs");
exports.LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return (0, rxjs_1.lastValueFrom)((0, handle_next_departure_1.generateAlexaNextDeparture)({
            stationId: constants_1.STATION_ID,
            tz: constants_1.TIMEZONE
        }).pipe((0, rxjs_1.map)((speechText) => {
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Siguiente trenes', speechText)
                .withShouldEndSession(true)
                .getResponse();
        }), (0, rxjs_1.catchError)((err) => {
            return (0, rxjs_1.of)(handlerInput.responseBuilder
                .speak(`Un error ha ocurrido: ${err.message}`)
                .withShouldEndSession(true)
                .getResponse());
        })));
    },
};
