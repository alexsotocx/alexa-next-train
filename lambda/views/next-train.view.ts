import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone  from 'dayjs/plugin/timezone';
import { IDeparture } from "../services/departure.handler";

dayjs.extend(utc);
dayjs.extend(timezone);

export function createAlexaResponseDeparture(nextTrain: IDeparture, tz: string): string {
    const delay = nextTrain.delayInMinutes ? `con un retraso de ${nextTrain.delayInMinutes} minutos` : '';

    const departureTime = dayjs(nextTrain.departureTime).tz(tz).format('H:mm');
    const response = `Tren en dirección ${nextTrain.direction}, sale a las ${departureTime}`;
    return delay ? `${response} ${delay}` : response;
}

export function concactResponses(responses: string[]): string {
    if(responses.length === 1) return `El proximo tren: ${responses[0]}`;
    return `El proximo tren: ${responses[0]}. El siguiente tren: ${responses[1]}`
}