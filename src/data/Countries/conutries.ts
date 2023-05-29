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

export const findCountryByCountryCode = (code: string): Country | undefined => {
  return getCountries().find(country => country.code === code)
}

const getCountries = (): Country[] => countriesGeoJson.features
  .map((properties: any) => {
    let searchMatches = getSearchMatches(properties.properties)
    let coordinates = getCoordinates(properties)
    let flagCode = getFlagCode(properties.properties)
    let details = getDetails(properties.properties)
    return {
      name: properties.properties.NAME,
      code: properties.properties.ADM0_A3_IS,
      flagCode: flagCode,
      coordinates: {
        lng: coordinates[0],
        lat: coordinates[1]
      },
      searchMatches: searchMatches,
      details: details
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
  const validate = (code: number | string | undefined): string | null => {
    if (code === undefined) return null
    if (code === "-99") return null
    if (code === -99) return null
    if (code.toString().trim().length !== 2) return null
    return `${code}`
  }

  const resolveIfBlank = (name: string, code: string) => {
    switch (name) {
      case "France":
        return "FR"
      case "Norway":
        return "NO"
    }

    return code
  }

  let validatedCode = validate(properties.ISO_A2?.toUpperCase())
    ?? validate(properties.POSTAL?.toUpperCase())
    ?? ""

  return resolveIfBlank(properties.NAME, validatedCode)
}

const getDetails = (properties: any): CountryDetails => {
  return {
    formalName: properties.FORMAL_EN,
    type: properties.TYPE,
    continent: properties.CONTINENT,
    region: properties.REGION,
    subregion: properties.SUBREGION,
    populationNumber: properties.POP_EST,
    populationYear: properties.POP_YEAR,
    gdpNumber: properties.GDP_MD_EST,
    gdpYear: properties.GDP_YEAR
  }
}

export interface Country {
  name: string,
  code: string,
  flagCode: string,
  coordinates: { lat: number, lng: number },
  searchMatches: string[],
  details: CountryDetails
}

export interface CountryDetails {
  formalName: string,
  type: string,
  continent: string,
  region: string,
  subregion: string,
  populationNumber: number,
  populationYear: number,
  gdpNumber: number,
  gdpYear: number
}
