"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDeparture = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function formatDeparture(nextTrain, tz) {
    const departureTime = (0, dayjs_1.default)(nextTrain.realDepartureTime).tz(tz).format('H:mm');
    return `${nextTrain.direction} ${departureTime}.`;
}
exports.formatDeparture = formatDeparture;
