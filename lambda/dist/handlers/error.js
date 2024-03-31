"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
exports.ErrorHandler = {
    canHandle(handlerInput, error) {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('No entiendo tu comando. Por favor, repítelo.')
            .reprompt('No entiendo tu comando. Por favor, repítelo.')
            .getResponse();
    }
};
