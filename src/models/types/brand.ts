import { LatestReleaseVideo, YoutubeInsights } from './artist';
import { LineChartModel } from './charts';

export type demographics = Array<
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

export type industry = Array<
    string
>;

export type Brand = {
  id: string;
  name: string;
  logo: string;
  website: string;
  contact: string;
  bowie_brand_id: string;
  demographics: demographics;
  media_handles: media_handles;
  brand_affinity: LineChartModel;
  latest_youtube_release: Array<LatestReleaseVideo>;
  youtube_insights: YoutubeInsights;
  industry: string[];
  comments?: string;
  last_updated_by?: string;
  last_modified_at: Date;
}

export type ShortBrand = {
  id: string;
  name: string;
  logo: string;
  website: string;
  contact: string;
  bowie_brand_id: string;
  demographics: demographics;
  media_handles: media_handles;
  industry: string[];
  comments?: string;
  last_updated_by?: string;
  last_modified_at: Date;
}
