import React, {useContext, useEffect, useRef, useState} from "react";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import {countriesGeoJson, findCountryByCountryCode, getFlagCode} from "../../data/Countries/conutries";
import {SelectedCountryContext, VisitedCountriesContext} from "../App/App";
import {useWindowSize} from "usehooks-ts";
import './GlobeWrapper.css';
import {getFlagCapMaterial} from "../../data/Materials/countryCapMaterials";

function GlobeWrapper() {
  const globeRef = useRef();
  const [countryHovered, setCountryHovered] = useState<any>();
  const {setSelectedCountry, selectedCountry} = useContext(SelectedCountryContext)
  const { codes: visitedCountries } = useContext(VisitedCountriesContext)
  const windowSize = useWindowSize();
  const globeSize = Math.min(windowSize.height, windowSize.width)

  useEffect(() => {
    const countryLocation = {
      lat: selectedCountry?.coordinates?.lat ?? 36,
      lng: selectedCountry?.coordinates?.lng ?? 19,
      altitude: 1.8
    };

    let globe = globeRef?.current as any
    globe?.pointOfView(countryLocation, 750)
  }, [selectedCountry]);

  const getCountryLabel = (polygon: any) => {
    return `
      <div style='
        color: white;
        background: black;
        font-size: 16px;
        padding: 5px;
        border-radius: 5px;
        font-weight: bold;
      '>
        ${polygon?.properties.NAME_SORT}
      </div>
    `;
  }

  const getCountryColor = (polygon: any) => {
    let codeName = polygon?.properties.ADM0_A3_IS
    let isSelected = selectedCountry?.code === codeName
    let isVisited = visitedCountries.includes(codeName)

    if (isSelected && isVisited) {
      return 'rgba(218,236,246,0.7)'
    }

    if (isSelected) {
      return 'rgba(110,143,198,0.7)'
    }

    if (isVisited) {
      return 'rgb(218,236,246)'
    }

    return 'rgb(110,143,198)'
  }

  const globeMaterial = () => {
    let material = new THREE.MeshPhongMaterial()
    let color = new THREE.Color();
    color.setStyle('rgb(0,43,133)')
    material.color = color
    material.transparent = true
    material.opacity = 0.95

    return material
  }

  const computedCapMaterial = (polygon: any) => {
    let codeName = polygon?.properties.ADM0_A3_IS
    let isVisited = visitedCountries.includes(codeName)

    if (isVisited) {
      let flagCode = getFlagCode(polygon?.properties).toLowerCase()
      return getFlagCapMaterial(flagCode)
    }

    const material = new THREE.MeshPhongMaterial();
    let color = new THREE.Color();
    color.setStyle(getCountryColor(polygon))
    material.color = color
    return material
  }

  const resetZoom = (pov: any) => {
    const countryLocation = {
      lat: pov.lat,
      lng: pov.lng,
      altitude: 1.8
    };

    let globe = globeRef?.current as any
    globe?.pointOfView(countryLocation, 0)
  }

  const onCountryClick = (polygon: any) => {
    let code = polygon?.properties.ADM0_A3_IS
    let country = findCountryByCountryCode(code)
    setSelectedCountry(country)
  }

  return (
    <div className="GlobeWrapper">
      <Globe
        ref={globeRef}
        polygonsData={countriesGeoJson.features}
        backgroundColor={'#03134b'}
        polygonAltitude={0.01}
        polygonSideColor={() => '#ffffff00'} // sides
        polygonStrokeColor={() => '#003296'} // borders
        polygonCapColor={getCountryColor} // surface
        polygonCapMaterial={computedCapMaterial}
        polygonLabel={getCountryLabel}
        onPolygonHover={setCountryHovered}
        onPolygonClick={onCountryClick}
        globeMaterial={globeMaterial()}
        onZoom={resetZoom}
        width={globeSize}
        height={globeSize}
      />
    </div>
  );
}

export default GlobeWrapper;
