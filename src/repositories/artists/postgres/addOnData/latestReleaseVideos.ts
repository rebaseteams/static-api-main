import { LatestReleaseVideo } from '../../../../models/types/artist';

const latestReleaseVideos: Array<LatestReleaseVideo> = [
  {
    tumbnail: 'https://www.designyoutube.com/img/michael-jackson.jpg',
    title: 'Youtube video 1',
    url: 'https://www.youtube.com/embed/YdxdpRZgfT4',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/pAyKJAtDNCw/maxresdefault.jpg',
    title: 'Youtube video 2',
    url: 'https://www.youtube.com/embed/plYAc5pT-PY',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/rDKjb2VhLqg/maxresdefault.jpg',
    title: 'Youtube video 3',
    channelName: 'Michael Jackson Fans',
    url: 'https://www.youtube.com/embed/5Lhul9_NEAY',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/qw0D_KN2KN8/maxresdefault.jpg',
    title: 'Youtube video 1',
    url: 'https://www.youtube.com/embed/k_MBR82hipk',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
];

export default latestReleaseVideos;
