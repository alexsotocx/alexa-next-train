import { describe, expect, test, jest } from '@jest/globals'

import { concactResponses, createAlexaResponseDeparture } from './next-train.view'
import { IDeparture } from '../services/departure.handler';

describe('NextTrainView', () => {
    describe('createAlexaResponseDeparture', () => {
        const departure: IDeparture = {
            direction: 'Hauptbahnhof',
            transportIdentifier: 'S8',
            departureTime: new Date('2021-01-01T08:00:00Z').getTime(),
            realDepartureTime: new Date('2021-01-01T08:00:00Z').getTime(),
            delayInMinutes: 0
        };

        test('should return a message with the next train', () => {
            const speechText = createAlexaResponseDeparture(departure, 'Europe/Berlin');
            expect(speechText).toEqual('Tren en dirección Hauptbahnhof, sale a las 9:00');
        });

        test('should return a message with the next train and delay', () => {
            const speechText = createAlexaResponseDeparture({
                ...departure,
                delayInMinutes: 5
            }, 'Europe/Berlin');

            expect(speechText).toEqual('Tren en dirección Hauptbahnhof, sale a las 9:00 con un retraso de 5 minutos');
        });
    });

    describe('concactResponses', () => {
        test('should return a message with one train', () => {
            const speechText = concactResponses(['Tren en dirección Hauptbahnhof, sale a las 9:00']);
            expect(speechText).toEqual('El proximo tren: Tren en dirección Hauptbahnhof, sale a las 9:00');
        });

        test('should return a message with two trains', () => {
            const speechText = concactResponses([
                'Tren en dirección Hauptbahnhof, sale a las 9:00',
                'Tren en dirección Ostbahnhof, sale a las 9:05'
            ]);

            expect(speechText).toEqual('El proximo tren: Tren en dirección Hauptbahnhof, sale a las 9:00. El siguiente tren: Tren en dirección Ostbahnhof, sale a las 9:05');
        });
    });
});