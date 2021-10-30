interface ICountry {
  id: number;
  code: string;
  name: string;
}

interface IState {
  id: number;
  code: string;
  name: string;
}

interface ICity {
  id: number;
  code: string;
  name: string;
}

export interface IStartupDTOS {
  id: string;
  surname: string;
  name: string;
  descriptionShort: string;
  description: string;
  logo: string;
  logoUrl: string;
  site: string;
  countryId: number;
  country?: ICountry;
  stateId: number;
  state?: IState;
  cityId: number;
  city?: ICity;
  phase: number;
  businessModel: number;
  segment: number;
  clientsNumber: number;
  partnersNumber: number;
  pitchdeck?: string;
  pitchdeckUrl?: string;
  breakeven: number;
  searchInvestment: number;
  valueCapture: number;
  equityPercentage: number;
  timeBreakevenAfterInvestment: number;
  manyMonthsInvestmentLast: number;
  valuation: number;
  status: string;
  createdAt: Date;
  fundationDate: Date;
}