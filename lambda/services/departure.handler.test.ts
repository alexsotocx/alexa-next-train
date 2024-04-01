import { describe, expect, test, jest } from '@jest/globals'

import { DepartureHandler, IDepartureAPI } from './departure.handler'
import { lastValueFrom, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MVGDepature } from './mvg.api';
import { departetureFixture } from '../handlers/test/fixtures';

describe('DepartureHandler', () => {
    const apiMock: jest.MockedObject<IDepartureAPI> = {
        getDepartures: jest.fn()
    };

    const handler = new DepartureHandler(
        apiMock
    );

    describe('getDepartures', () => {
        test('should call getDepartures', async () => {
            apiMock.getDepartures.mockReturnValue(of({
                data: [departetureFixture],
                status: 200,
            } as AxiosResponse<MVGDepature[]>));

            await expect(lastValueFrom(handler.getDepartures('test', departetureFixture.destination))).resolves.toEqual([{
                direction: departetureFixture.destination,
                transportIdentifier: departetureFixture.label,
                departureTime: departetureFixture.plannedDepartureTime,
                realDepartureTime: departetureFixture.realtimeDepartureTime,
                delayInMinutes: departetureFixture.delayInMinutes
            }]);

            expect(apiMock.getDepartures).toBeCalledWith('test');
        });

        test('should filter by direction', async () => {
            apiMock.getDepartures.mockReturnValue(of({
                data: [departetureFixture],
                status: 200,
            } as AxiosResponse<MVGDepature[]>));

            await expect(lastValueFrom(handler.getDepartures('test', 'other'))).resolves.toEqual([]);
        });

        describe('when api returns an error', () => {
            test('should throw an error', async () => {
                apiMock.getDepartures.mockReturnValue(of({
                    data: 'error',
                    status: 500,
                } as AxiosResponse<any>));

                await expect(lastValueFrom(handler.getDepartures('test', departetureFixture.destination))).rejects.toThrowError();
            });
        });
    });
});