import { describe, expect, test } from '@jest/globals'

import { formatDeparture } from './next-train.view'
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
            const speechText = formatDeparture(departure, 'Europe/Berlin');
            expect(speechText).toEqual('Hauptbahnhof 9:00.');
        });
    });
});