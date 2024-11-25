"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAlexaNextDeparture = void 0;
const departure_handler_1 = require("../services/departure.handler");
const mvg_api_1 = require("../services/mvg.api");
const http_service_1 = require("../services/http.service");
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const next_train_view_1 = require("./next-train.view");
function generateAlexaNextDeparture({ stationId, tz }) {
    const mvgService = new mvg_api_1.MVGService(new http_service_1.HttpService(axios_1.default.create({
        baseURL: 'https://www.mvg.de/api/bgw-pt/v3',
    })));
    const departureHandler = new departure_handler_1.MVGDepartureAdapter(mvgService);
    const departuresObservable = departureHandler.getDepartures(stationId);
    return departuresObservable.pipe((0, rxjs_1.map)(departures => departures.map((d) => (0, next_train_view_1.formatDeparture)(d, tz)).join('\n')));
}
exports.generateAlexaNextDeparture = generateAlexaNextDeparture;
