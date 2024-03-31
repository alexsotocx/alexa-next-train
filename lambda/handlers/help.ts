import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const HelpIntentHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      const request = handlerInput.requestEnvelope.request;    
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
      const speechText = 'Te dare la informacion de tu parada de tren!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Preguntame: cuando es mi tren', speechText)
        .getResponse();
    },
  };