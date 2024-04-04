"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVGService = void 0;
const rxjs_1 = require("rxjs");
const constants_1 = require("../constants");
class MVGService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getDepartures(stationId) {
        const searchParams = new URLSearchParams({
            globalId: stationId,
            limit: constants_1.RESULT_LIMIT.toString(),
            transportTypes: constants_1.TRANSPORT_TYPE.join(',')
        });
        return this.httpService.get(`/departure`, {
            params: searchParams,
        }).pipe((0, rxjs_1.timeout)({
            each: 3000,
            with: () => (0, rxjs_1.throwError)(() => new Error('Timeout while fetching departures')),
        }));
    }
}
exports.MVGService = MVGService;
