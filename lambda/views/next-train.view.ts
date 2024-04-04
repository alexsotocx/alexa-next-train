import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { IDeparture } from "../services/departure.handler";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDeparture(nextTrain: IDeparture, tz: string): string {
    const departureTime = dayjs(nextTrain.realDepartureTime).tz(tz).format('H:mm');
    return `${nextTrain.direction} ${departureTime}.`
}

