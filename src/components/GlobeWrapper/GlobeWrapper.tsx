import React, {useEffect, useState} from "react";
import geojson from "../../data/countries.json";
import Globe from "react-globe.gl";
import * as THREE from 'three';

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
function GlobeWrapper() {
  const [countries, setCountries] = useState<any>();
  const [countryHovered, setCountryHovered] = useState<any>();

  useEffect(() => {
    setCountries(geojson.features)
  }, []);

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
    color.setStyle('#0000ff')
    material.color = color
    material.transparent = true
    material.opacity = 0.5

    return material
  }

  return (
    <Globe
      polygonsData={countries}
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      lineHoverPrecision={0}
      polygonAltitude={calculateAltitude}
      // polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'} // sides
      polygonStrokeColor={() => '#11409E'} // borders
      polygonCapColor={() => '#DCEEF8'} // white
      polygonLabel={getLabel}
      onPolygonHover={ (polygon: object | null, prevPolygon: object | null) =>
        setCountryHovered(polygon)
      }
      polygonsTransitionDuration={300}
      showGlobe={true}
      globeMaterial={globeMaterial()}
    />
  );
}

export default GlobeWrapper;
