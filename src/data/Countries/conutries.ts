import {FeatureCollection} from "geojson";
import countriesJson from "./countries.json";
import * as turf from '@turf/turf'

export const countriesGeoJson: FeatureCollection = countriesJson as unknown as FeatureCollection

export const findCountries = (input: string) => {
  let searchString = input.trim().toLowerCase()
  if (searchString.length <= 2) return []
  return getCountries().filter(country => {
    return country.searchMatches.some(match => match.includes(searchString))
  })
}

const getCountries = (): Country[] => countriesGeoJson.features
  .map((properties: any) => {
    let searchMatches = getSearchMatches(properties.properties)
    let coordinates = getCoordinates(properties)
    let flagCode = getFlagCode(properties.properties)
    return {
      name: properties.properties.NAME,
      formalName: properties.properties.FORMAL_EN,
      code: properties.properties.ADM0_A3_IS,
      flagCode: flagCode,
      coordinates: {
        lng: coordinates[0],
        lat: coordinates[1]
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

const getCoordinates = (properties: any): number[] => {
  let coordinatesStartingPoint = properties.geometry.coordinates[0]
  let extractedCoordinates: number[][]
  if (coordinatesStartingPoint.length === 1) {
    extractedCoordinates = coordinatesStartingPoint[0]
  } else {
    extractedCoordinates = coordinatesStartingPoint
  }

  let features = turf.points(extractedCoordinates)
  let center = turf.center(features)
  return [...center.geometry.coordinates]
}

const getFlagCode = (properties: any): string => {
  return properties.ISO_A2?.toUpperCase()
    ?? properties.POSTAL?.toUpperCase()
    ?? ""
}

export interface Country {
  name: string,
  formalName: string,
  code: string,
  flagCode: string,
  coordinates: { lat: number, lng: number },
  searchMatches: string[]
}
