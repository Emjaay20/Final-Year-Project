import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetOxygenSaturationsResponse, GetBodyTemperaturesResponse, GetHeartRatesResponse } from "./types";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["OxygenSaturations", "BodyTemperatures", "HeartRates",],
   
    endpoints: (build) => ({
        getOxygenSaturations: build.query<GetOxygenSaturationsResponse, void>({
            query: () => "oxygenSaturation/oxygenSaturations/",
            providesTags: ["OxygenSaturations"],

        }),
        getBodyTemperatures: build.query<Array<GetBodyTemperaturesResponse>, void>({
            query: () => "bodyTemperature/bodyTemperatures/", // Corrected typo here
            providesTags: ["BodyTemperatures"],
        }),
        getHeartRates: build.query<Array<GetHeartRatesResponse>, void>({
            query: () => "heartRate/heartRates/", // Corrected typo here
            providesTags: ["HeartRates"],
        }),
    }),
});

export const { useGetOxygenSaturationsQuery, useGetBodyTemperaturesQuery, useGetHeartRatesQuery } = api;