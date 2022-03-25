/* eslint-disable semi */

import { LineChartModel } from './charts';

/* eslint-disable no-unused-vars */
export type audience = Array<
    {
        demographicName: string,
        fields: Array<
            {
                name: string,
                value: number
            }
        >
    }
>;

export type media_handles = Array<
    {
        handleName: string,
        url: string,
        logo: string,
        followers: number
    }
>;

export type Artist = {
    id: string,
    name: string,
    gender: string,
    associated_brands: Array<string>,
    venues: Array<string>,
    country: string,
    image: string,
    cover_image: string,
    bio: string,
    manager: string,
    contact: string,
    address: string,
    popularity: number,
    audience: audience,
    media_handles: media_handles
    brandAffinity: LineChartModel
};
