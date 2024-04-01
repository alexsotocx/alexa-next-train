"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concactResponses = exports.createAlexaResponseDeparture = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function createAlexaResponseDeparture(nextTrain, tz) {
    const delay = nextTrain.delayInMinutes ? `con un retraso de ${nextTrain.delayInMinutes} minutos` : '';
    const departureTime = (0, dayjs_1.default)(nextTrain.departureTime).tz(tz).format('H:mm');
    const response = `Tren en dirección ${nextTrain.direction}, sale a las ${departureTime}`;
    return delay ? `${response} ${delay}` : response;
}
exports.createAlexaResponseDeparture = createAlexaResponseDeparture;
function concactResponses(responses) {
    if (responses.length === 1)
        return `El proximo tren: ${responses[0]}`;
    return `El proximo tren: ${responses[0]}. El siguiente tren: ${responses[1]}`;
}
exports.concactResponses = concactResponses;
