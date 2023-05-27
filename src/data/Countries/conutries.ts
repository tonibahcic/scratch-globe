import {FeatureCollection} from "geojson";
import countriesJson from "./countries.json";

export const countriesGeoJson: FeatureCollection = countriesJson as unknown as FeatureCollection

export const findCountries = (input: string) => {
  if (input.length <= 2) return []
  return getCountries().filter(country => {
    return country.searchMatches.some(match => match.includes(input))
  })
}

const getCountries = (): Country[] => countriesGeoJson.features
  .map((properties: any) => {
    let searchMatches = getSearchMatches(properties.properties)
    return {
      name: properties.properties.NAME?.toLowerCase(),
      formalName: properties.properties.FORMAL_EN?.toLowerCase(),
      coordinates: {
        lat: 0,
        lng: 0
      },
      searchMatches: searchMatches
    }
  })

const getSearchMatches = (properties: any): string[] => {
  return Array.from(
    new Set(
      [
        properties.NAME?.toLowerCase(),
        properties.NAME_LONG?.toLowerCase(),
        properties.BRK_NAME?.toLowerCase(),
        properties.FORMAL_EN?.toLowerCase(),
        properties.NAME_CIAWF?.toLowerCase(),
        properties.NAME_SORT?.toLowerCase()
      ].filter(str => str !== undefined && str !== null)
    )
  )
}

export interface Country {
  name: string,
  formalName: string,
  coordinates: { lat: number, lng: number },
  searchMatches: string[]
}
