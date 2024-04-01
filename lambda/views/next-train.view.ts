import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone  from 'dayjs/plugin/timezone';
import { IDeparture } from "../services/departure.handler";

dayjs.extend(utc);
dayjs.extend(timezone);

export function createAlexaResponseDeparture(departures: IDeparture[], tz: string): string {
    if (departures.length === 0) return 'No hay salidas en la dirección deseada.';
    const nextTrain = departures[0];
    const delay = nextTrain.delayInMinutes ? `con un retraso de ${nextTrain.delayInMinutes} minutos` : '';

    const departureTime = dayjs(nextTrain.departureTime).tz(tz).format('H:mm');
    const response = `El próximo tren en dirección ${nextTrain.direction}, sale a las ${departureTime}`;
    return delay ? `${response} ${delay}` : response;
}