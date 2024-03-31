"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskWeatherIntentHandler = void 0;
exports.AskWeatherIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AskWeatherIntent';
    },
    handle(handlerInput) {
        const speechText = 'The weather today is sunny.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('The weather today is sunny.', speechText)
            .getResponse();
    },
};
