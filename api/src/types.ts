export interface City {
  _id: string;
  name: string;
};

export interface Weather {
  city: string;
  current: {
    temp: number;
    descShort: string;
    descLong: string;
    owmIcon?: string;
  };
};

export interface User {
  username: string;
  password: string;
  favouriteCity?: string;
};