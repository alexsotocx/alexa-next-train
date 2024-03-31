"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchRequestHandler = void 0;
exports.LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Preguntame cuando es tu siguiente tren!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Preguntame cuando es tu siguiente tren!', speechText)
            .getResponse();
    },
};
