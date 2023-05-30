import React, {useContext, useEffect, useRef, useState} from "react";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import {countriesGeoJson, findCountryByCountryCode} from "../../data/Countries/conutries";
import {SelectedCountryContext, VisitedCountriesContext} from "../App/App";

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
// geojson https://geojson.org/
// geojson https://www.npmjs.com/package/@types/geojson
// db geojson helper http://ccksp.gnf.tf/dataset/ccksp-test-dataset/resource/33454cab-b5fd-4b23-95ef-1ab6884723aa#{query:{q:!united},view-graph:{graphOptions:{hooks:{processOffset:{},bindEvents:{}}}},graphOptions:{hooks:{processOffset:{},bindEvents:{}}},view-map:{geomField:!geojson}}
function GlobeWrapper() {
  const globeRef = useRef();
  const [countryHovered, setCountryHovered] = useState<any>();
  const {setSelectedCountry, selectedCountry} = useContext(SelectedCountryContext)
  const { codes: visitedCountries } = useContext(VisitedCountriesContext)

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
      return '#DAECF6'
    }

    return '#6E8FC6'
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
      polygonAltitude={0.01}
      polygonSideColor={() => '#ffffff00'} // sides
      polygonStrokeColor={() => '#003296'} // borders
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
