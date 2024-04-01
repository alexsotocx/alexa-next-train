"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVGService = void 0;
class MVGService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getDepartures(stationId) {
        return this.httpService.get(`/location/queryWeb?q=${stationId}`);
    }
}
exports.MVGService = MVGService;
