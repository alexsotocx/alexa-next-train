import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const MyNextTrainHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'MyNextTrain';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'The weather today is sunny.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('The weather today is sunny.', speechText)
            .getResponse();
    },
};