"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyNextTrainHandler = void 0;
exports.MyNextTrainHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'MyNextTrain';
    },
    handle(handlerInput) {
        const speechText = 'The weather today is sunny.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('The weather today is sunny.', speechText)
            .getResponse();
    },
};
