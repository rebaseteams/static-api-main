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

export type LatestReleaseVideo = {
    tumbnail: string,
    title: string,
    channelName: string,
    views: number,
    url: string,
    subscribers: number,
  }

export type YoutubeInsights = {
    channel: {
    id: string;
    subscribersCount: number;
    viewsCount: number;
    videosCount: number;
    avgViewsCount: number;
    avgLikesCount: number;
    engagementRatio: number;
    },
    videos: Array<{
    playlistId: string;
    songCount: number;
    viewsCount: number;
    likesCount: number;
    dislikeCount: number;
    commentsCount: number;
    }>
  }

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
    brand_affinity: LineChartModel
    popularity_over_time: LineChartModel
    latest_youtube_release: Array<LatestReleaseVideo>
    youtube_insights: YoutubeInsights
    misc: any
}
