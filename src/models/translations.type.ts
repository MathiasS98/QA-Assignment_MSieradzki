import { Domain } from "@models/domain.type";
import { Endpoints } from "@models/endpoints.type";

export type Translations = {
  [key in Domain]: {
    endpoints: Endpoints[key];
    countries: {
      [country: string]: {
        name: string;
        regions: {
          [region: string]: string;
        };
      };
    };
  };
};
