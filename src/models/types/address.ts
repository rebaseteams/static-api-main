/* eslint-disable semi */

export type Address = {
  pincode: number;
  country: string;
  city: string;
  geoLocation: {
    lat: number;
    long: number;
  };
};
