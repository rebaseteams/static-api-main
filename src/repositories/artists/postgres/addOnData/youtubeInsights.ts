import { YoutubeInsights } from '../../../../models/types/artist';

const youtubeinsights: YoutubeInsights = {
  channel: {
    id: 'jackson',
    subscribersCount: Math.floor(Math.random() * 10000),
    viewsCount: Math.floor(Math.random() * 1000000),
    videosCount: Math.floor(Math.random() * 1000),
    avgViewsCount: Math.floor(Math.random() * 100000),
    avgLikesCount: Math.floor(Math.random() * 100000),
    engagementRatio: 73.3,
  },
  videos: [
    {
      playlistId: 'playlist-1',
      songCount: Math.floor(Math.random() * 10),
      viewsCount: Math.floor(Math.random() * 1000000),
      likesCount: Math.floor(Math.random() * 100000),
      dislikeCount: Math.floor(Math.random() * 10000),
      commentsCount: Math.floor(Math.random() * 10000),
    },
    {
      playlistId: 'playlist-2',
      songCount: Math.floor(Math.random() * 10),
      viewsCount: Math.floor(Math.random() * 1000000),
      likesCount: Math.floor(Math.random() * 100000),
      dislikeCount: Math.floor(Math.random() * 10000),
      commentsCount: Math.floor(Math.random() * 10000),
    },
  ],
};

export { youtubeinsights };
