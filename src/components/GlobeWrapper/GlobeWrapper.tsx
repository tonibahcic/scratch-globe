import React, {useContext, useEffect, useRef, useState} from "react";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import {countriesGeoJson, findCountryByCountryCode} from "../../data/Countries/conutries";
import {SelectedCountryContext} from "../App/App";

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
// geojson https://geojson.org/
// geojson https://www.npmjs.com/package/@types/geojson
// db geojson helper http://ccksp.gnf.tf/dataset/ccksp-test-dataset/resource/33454cab-b5fd-4b23-95ef-1ab6884723aa#{query:{q:!united},view-graph:{graphOptions:{hooks:{processOffset:{},bindEvents:{}}}},graphOptions:{hooks:{processOffset:{},bindEvents:{}}},view-map:{geomField:!geojson}}
function GlobeWrapper() {
  const globeRef = useRef();
  const [countryHovered, setCountryHovered] = useState<any>();
  const {setSelectedCountry, selectedCountry} = useContext(SelectedCountryContext)

  useEffect(() => {
    const countryLocation = {
      lat: selectedCountry?.coordinates?.lat ?? 36,
      lng: selectedCountry?.coordinates?.lng ?? 19,
      altitude: 1.8
    };

    let globe = globeRef?.current as any
    globe?.pointOfView(countryLocation, 750)
  }, [selectedCountry]);

  const getAltitude = (polygon: any) => {
    // return polygon?.properties?.ADM0_A3 == countryHovered?.properties?.ADM0_A3 ? 0.02 : 0.01
    return 0.01
  }

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
    if (selectedCountry?.code === codeName) {
      return '#577ccb'
    }

    const visitedCountries = ['HRV', 'ITA', 'GBR'];
    if (visitedCountries.includes(codeName)) {
      return '#fff'
    }

    return '#9ab8e7ff'
  }

  const globeMaterial = () => {
    let material = new THREE.MeshPhongMaterial()
    let color = new THREE.Color();
    color.setStyle('rgba(0,22,161)')
    material.color = color
    material.transparent = true
    material.opacity = 0.85

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
    <Globe
      ref={globeRef}
      polygonsData={countriesGeoJson.features}
      backgroundColor={'#03134b'}
      polygonAltitude={getAltitude}
      polygonSideColor={() => '#ffffff00'} // sides
      polygonStrokeColor={() => '#11409e'} // borders
      polygonCapColor={getCountryColor} // surface
      polygonLabel={getCountryLabel}
      onPolygonHover={setCountryHovered}
      onPolygonClick={onCountryClick}
      globeMaterial={globeMaterial()}
      onZoom={resetZoom}
      width={1000}
      height={890}
    />
  );
}

export default GlobeWrapper;
