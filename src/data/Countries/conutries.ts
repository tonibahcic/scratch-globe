import {FeatureCollection} from "geojson";
import countriesJson from "./countries.json";

export const countriesGeoJson: FeatureCollection = countriesJson as unknown as FeatureCollection

export const findCountries = (input: string) => {
  if (input.length <= 2) return []
  return countriesFullName
    .filter(fullName => fullName.includes(input))
}

// todo: full name, short name, 3 letter name, coordinates
const countriesFullName = countriesGeoJson.features
  .map((properties: any) => properties.properties.FORMAL_EN?.toLowerCase())
  .filter((name: any) => name !== undefined && name != null)
