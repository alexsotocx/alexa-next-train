import { IDeparture } from "../services/departure.handler";

export function createAlexaResponseDeparture(departures: IDeparture[]): string {
    if (departures.length === 0) return 'No hay salidas en la dirección deseada.';
    const nextTrain = departures[0];
    const delay = nextTrain.delayInMinutes ? `con un retraso de ${nextTrain.delayInMinutes} minutos` : '';
    const response = `El próximo tren en dirección ${nextTrain.direction}, sale a las ${new Date(nextTrain.realDepartureTime).toLocaleTimeString()}`;
    return delay? `${response} ${delay}` : response;
}