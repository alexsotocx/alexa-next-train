"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVGDepartureAdapter = void 0;
const rxjs_1 = require("rxjs");
class MVGDepartureAdapter {
    constructor(api) {
        this.api = api;
    }
    getDepartures(stationId) {
        return this.api.getDepartures(stationId).pipe((0, rxjs_1.map)(response => {
            if (response.status === 200)
                return response.data;
            throw new Error(`Error while fetching departures ${response.status}, ${response.data}`);
        }), (0, rxjs_1.map)(data => data.map(dep => ({
            direction: dep.destination,
            transportIdentifier: dep.label,
            departureTime: dep.plannedDepartureTime,
            realDepartureTime: dep.realtimeDepartureTime,
            delayInMinutes: dep.delayInMinutes
        }))));
    }
}
exports.MVGDepartureAdapter = MVGDepartureAdapter;
