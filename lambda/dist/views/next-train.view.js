"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlexaResponseDeparture = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function createAlexaResponseDeparture(departures, tz) {
    if (departures.length === 0)
        return 'No hay salidas en la dirección deseada.';
    const nextTrain = departures[0];
    const delay = nextTrain.delayInMinutes ? `con un retraso de ${nextTrain.delayInMinutes} minutos` : '';
    const departureTime = (0, dayjs_1.default)(nextTrain.departureTime).tz(tz).format('H:mm');
    const response = `El próximo tren en dirección ${nextTrain.direction}, sale a las ${departureTime}`;
    return delay ? `${response} ${delay}` : response;
}
exports.createAlexaResponseDeparture = createAlexaResponseDeparture;
