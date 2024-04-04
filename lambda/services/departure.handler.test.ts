import { describe, expect, test, jest } from '@jest/globals'

import { MVGDepartureAdapter } from './departure.handler'
import { lastValueFrom, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MVGDepature, IMVGAPI } from './mvg.api';
import { departetureFixture } from '../test/fixtures';

describe('DepartureHandler', () => {
    const apiMock: jest.Mocked<IMVGAPI> = {
        getDepartures: jest.fn(),
    };

    const handler = new MVGDepartureAdapter(
        apiMock
    );

    describe('getDepartures', () => {
        test('should call getDepartures', async () => {
            apiMock.getDepartures.mockReturnValue(of({
                data: [departetureFixture],
                status: 200,
            } as AxiosResponse<MVGDepature[]>));

            await expect(lastValueFrom(handler.getDepartures('test'))).resolves.toEqual([{
                direction: departetureFixture.destination,
                transportIdentifier: departetureFixture.label,
                departureTime: departetureFixture.plannedDepartureTime,
                realDepartureTime: departetureFixture.realtimeDepartureTime,
                delayInMinutes: departetureFixture.delayInMinutes
            }]);

            expect(apiMock.getDepartures).toBeCalledWith('test');
        });

        describe('when api returns an error', () => {
            test('should throw an error', async () => {
                apiMock.getDepartures.mockReturnValue(of({
                    data: 'error',
                    status: 500,
                } as AxiosResponse<any>));

                await expect(lastValueFrom(handler.getDepartures('test'))).rejects.toThrowError();
            });
        });
    });
});