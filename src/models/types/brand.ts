export type demographics = {
  age: number,
  gender: string,
  location: string,
}

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
  industry: string[];
  comments?: string;
  last_updated_by?: string;
  last_modified_at?: Date;
}
