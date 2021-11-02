/* eslint-disable semi */

export type Address = {
  pincode: Number;
  country: String;
  city: String;
  geoLocation: {
    lat: Number;
    long: Number;
  };
};
