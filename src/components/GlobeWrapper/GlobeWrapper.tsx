import React, {useEffect, useState} from "react";
import countriesJson from "../../data/countries.json";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import {FeatureCollection} from "geojson";

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
// geojson https://geojson.org/
// geojson https://www.npmjs.com/package/@types/geojson
// db geojson helper http://ccksp.gnf.tf/dataset/ccksp-test-dataset/resource/33454cab-b5fd-4b23-95ef-1ab6884723aa#{query:{q:!united},view-graph:{graphOptions:{hooks:{processOffset:{},bindEvents:{}}}},graphOptions:{hooks:{processOffset:{},bindEvents:{}}},view-map:{geomField:!geojson}}
function GlobeWrapper() {
  const countriesGeoJson: FeatureCollection = countriesJson as unknown as FeatureCollection
  const [countryHovered, setCountryHovered] = useState<any>();

  useEffect(() => {
    console.log(countryHovered?.properties)
  }, [countryHovered]);

  const getAltitude = (polygon: any) => {
    // return polygon?.properties?.ADM0_A3 == countryHovered?.properties?.ADM0_A3 ? 0.02 : 0.01
    return 0.01
  }

  const getCountryLabel = (polygon: any) => {
    return `<div style='color: white; background: black'>${polygon?.properties.NAME_SORT}</div>`
  }

  const getCountryColor = (polygon: any) => {
    const visitedCountries = ['HRV', 'ITA', 'GBR'];
    if (visitedCountries.includes(polygon?.properties.ADM0_A3_IS)) {
      return 'white'
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

  return (
    <Globe
      polygonsData={countriesGeoJson.features}
      backgroundColor={'#fff'}
      polygonAltitude={getAltitude}
      polygonSideColor={() => '#ffffff00'} // sides
      polygonStrokeColor={() => '#11409e'} // borders
      polygonCapColor={getCountryColor} // surface
      polygonLabel={getCountryLabel}
      onPolygonHover={setCountryHovered}
      globeMaterial={globeMaterial()}
    />
  );
}

export default GlobeWrapper;
