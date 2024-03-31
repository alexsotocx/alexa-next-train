import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const MyNextTrainHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'MyNextTrain';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Tu siguiente tren es en 10 min';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Tu siguiente tren es en 10 min', speechText)
            .getResponse();
    },
};