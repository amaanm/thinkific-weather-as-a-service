export interface City {
  _id: string;
  name: string;
};

export interface Weather {
  city: string;
  current: {
    temp: number;
    desc_short: string;
    desc_long: string;
    owm_icon?: string;
  };
};

export interface User {
  username: string;
  password: string;
  favouriteCities: string[];
};