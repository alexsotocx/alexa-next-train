import { describe, expect, test, jest } from '@jest/globals'

import { createAlexaResponseDeparture } from './next-train.view'
import { IDeparture } from '../services/departure.handler';

describe('NextTrainView', () => {
    describe('createAlexaResponseDeparture', () => {
        test('should return a message with the next train', () => {
            const departures: IDeparture[] = [{
                direction: 'Hauptbahnhof',
                transportIdentifier: 'S8',
                departureTime: new Date('2021-01-01T08:00:00Z').getTime(),
                realDepartureTime: new Date('2021-01-01T08:00:00Z').getTime(),
                delayInMinutes: 0
            }];

            const speechText = createAlexaResponseDeparture(departures, 'Europe/Berlin');

            expect(speechText).toEqual('El próximo tren en dirección Hauptbahnhof, sale a las 9:00');
        });

        test('should return a message with the next train and delay', () => {
            const departures: IDeparture[] = [{
                direction: 'Hauptbahnhof',
                transportIdentifier: 'S8',
                departureTime: new Date('2021-01-01T08:00:00Z').getTime(),
                realDepartureTime: new Date('2021-01-01T08:00:00Z').getTime(),
                delayInMinutes: 5
            }];

            const speechText = createAlexaResponseDeparture(departures, 'Europe/Berlin');

            expect(speechText).toEqual('El próximo tren en dirección Hauptbahnhof, sale a las 9:00 con un retraso de 5 minutos');
        });
    });
});