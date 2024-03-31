import { HandlerInput, ErrorHandler as SDKErrorHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const ErrorHandler: SDKErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error): boolean {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`Error handled: ${error.message}`);
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('No entiendo tu comando. Por favor, repítelo.')
            .reprompt('No entiendo tu comando. Por favor, repítelo.')
            .getResponse();
    }
};