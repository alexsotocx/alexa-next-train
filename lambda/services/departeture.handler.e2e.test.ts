import { describe, expect, test, jest } from "@jest/globals";

import { MVGDepartureAdapter } from "./departure.handler";
import { catchError, lastValueFrom, of } from "rxjs";
import axios, { AxiosResponse } from "axios";
import { MVGDepature, IMVGAPI, MVGService } from "./mvg.api";
import { departetureFixture } from "../test/fixtures";
import { HttpService } from "./http.service";
import { STATION_ID, TIMEZONE } from "../constants";
import { generateAlexaNextDeparture } from "../views/handle-next-departure";

describe("DepartureHandler", () => {

  describe("getDepartures", () => {
    test("should call getDepartures", async () => {
      const r = await lastValueFrom(generateAlexaNextDeparture({ stationId: STATION_ID, tz: TIMEZONE }));

      expect(r).toMatch(/Herrsching \d?\d\:\d\d\./ig);
      expect(r).toMatch(/Flughafen M\ünchen \d?\d\:\d\d\./ig);
    });
  });
});
