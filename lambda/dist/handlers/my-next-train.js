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
        const speechText = 'Tu siguiente tren es en 10 min';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Tu siguiente tren es en 10 min', speechText)
            .getResponse();
    },
};
