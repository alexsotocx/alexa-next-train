"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVGService = void 0;
const rxjs_1 = require("rxjs");
class MVGService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getDepartures(stationId) {
        return this.httpService.get(`departure?globalId=${stationId}&limit=5`).pipe((0, rxjs_1.timeout)({
            each: 3000,
            with: () => (0, rxjs_1.throwError)(() => new Error('Timeout while fetching departures')),
        }));
    }
}
exports.MVGService = MVGService;
