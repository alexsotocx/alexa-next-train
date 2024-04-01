"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyNextTrainHandler = void 0;
const mvg_api_1 = require("../services/mvg.api");
const http_service_1 = require("../services/http.service");
const axios_1 = __importDefault(require("axios"));
const departure_handler_1 = require("../services/departure.handler");
const next_train_view_1 = require("../views/next-train.view");
const rxjs_1 = require("rxjs");
const aubingStationId = 'de:09162:1730';
const timezone = 'Europe/Berlin';
exports.MyNextTrainHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'MyNextTrain';
    },
    handle(handlerInput) {
        const mvgService = new mvg_api_1.MVGService(new http_service_1.HttpService(axios_1.default.create({
            baseURL: 'https://www.mvg.de/api/fib/v2/',
        })));
        const departureHandler = new departure_handler_1.MVGDepartureAdapter(mvgService);
        const departuresObservable = departureHandler.getDepartures(aubingStationId, ['Flughafen München', 'Ostbahnhof', 'Hauptbahnhof']);
        return (0, rxjs_1.lastValueFrom)(departuresObservable.pipe((0, rxjs_1.map)(departures => {
            if (departures.length === 0)
                throw new Error('No hay trenes en la estación');
            const speechText = [(0, next_train_view_1.createAlexaResponseDeparture)(departures[0], timezone)];
            if (departures.length >= 2) {
                speechText.push((0, next_train_view_1.createAlexaResponseDeparture)(departures[1], timezone));
            }
            return speechText;
        }), (0, rxjs_1.map)((speechTexts) => {
            return (0, next_train_view_1.concactResponses)(speechTexts);
        }), (0, rxjs_1.map)((speechText) => {
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Siguiente tren', speechText)
                .getResponse();
        })));
    },
};
