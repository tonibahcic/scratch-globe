import React, {useEffect, useState} from "react";
import countriesJson from "../../data/countries.json";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import {FeatureCollection} from "geojson";

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
// geojson https://geojson.org/
// geojson https://www.npmjs.com/package/@types/geojson
function GlobeWrapper() {
  const countriesGeoJson: FeatureCollection = countriesJson as unknown as FeatureCollection
  const [countryHovered, setCountryHovered] = useState<any>();

  useEffect(() => {
    console.log(countryHovered?.properties)
  }, [countryHovered]);

  const calculateAltitude = (polygon: any) => {
    // return polygon?.properties?.ADM0_A3 == countryHovered?.properties?.ADM0_A3 ? 0.02 : 0.01
    return 0.005
  }

  const getLabel = (polygon: any) => {
    return `<div style='color: white; background: black'>${polygon?.properties.NAME_SORT}</div>`
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
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      backgroundColor={'rgb(255,255,255)'}
      lineHoverPrecision={0}
      polygonAltitude={calculateAltitude}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.0)'} // sides
      polygonStrokeColor={() => '#11409E'} // borders
      polygonCapColor={() => 'rgb(154,184,231)'} // country color
      polygonLabel={getLabel}
      onPolygonHover={(polygon: object | null, prevPolygon: object | null) =>
        setCountryHovered(polygon)
      }
      polygonsTransitionDuration={300}
      showGlobe={true}
      globeMaterial={globeMaterial()}
    />
  );
}

export default GlobeWrapper;
