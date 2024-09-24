export type Rate = Record<string, number>;

export type RateBy = Record<string, Rate[]>;

export interface IExhangeRate {
  base: string;
  date: string;
  rates: Rate;
}
