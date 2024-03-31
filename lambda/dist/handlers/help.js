"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpIntentHandler = void 0;
exports.HelpIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Te dare la informacion de tu parada de tren!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Preguntame: cuando es mi tren', speechText)
            .getResponse();
    },
};
