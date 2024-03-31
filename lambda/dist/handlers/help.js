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
        const speechText = 'You can ask me the weather!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('You can ask me the weather!', speechText)
            .getResponse();
    },
};
